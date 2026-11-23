import glob
import re

prods = glob.glob('products/*.html')
print(f"Processing {len(prods)} product files...")

HALAL_CARD = """                        <!-- Halal Certification Trust Card -->
                        <div class="flex items-center justify-between p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-2xl mb-6 shadow-sm">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 border border-emerald-200">
                                    حلال
                                </div>
                                <div>
                                    <div class="flex items-center gap-1.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                                        <p class="text-xs font-bold text-emerald-950">JAKIM Halal Certified</p>
                                    </div>
                                    <p class="text-[10px] text-emerald-700">MS1500 Compliant &bull; 16 Certified Products</p>
                                </div>
                            </div>
                            <a href="https://manahalal.com/halal/companies/rempah-warisan-bernam-COMP-20260629-061346" target="_blank" rel="noopener noreferrer"
                               title="Verify JAKIM Halal Status on ManaHalal"
                               class="group px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition shadow-sm shrink-0">
                                <span>Verify</span>
                                <i data-lucide="external-link" class="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform"></i>
                            </a>
                        </div>
"""

# Regex that matches the entire JAKIM card block (from <!-- Halal Certification Trust Card --> to its closing </div>)
HALAL_CARD_PATTERN = re.compile(
    r'\s*<!-- Halal Certification Trust Card -->.*?</div>\s*\n',
    re.DOTALL
)

moved = 0
already_correct = 0
errors = []

for p in prods:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'JAKIM Halal Certified' not in content:
        errors.append(f"NO JAKIM CARD: {p}")
        continue

    # Determine where purchase-options-container ends — find the closing </div> after it
    # Pattern: <!-- DYNAMIC PURCHASE OPTIONS CONTAINER --> ... </div>
    # or for older pages: <!-- Purchase Button --> ... </div>
    
    # First remove any existing JAKIM card from BEFORE the purchase container
    # Find if JAKIM card is before purchase container
    jakim_pos = content.find('<!-- Halal Certification Trust Card -->')
    
    # Also handle multiline: find the JAKIM outer div start
    # The outer div starts right before or just after the comment
    purchase_pos = content.find('id="purchase-options-container"')
    if purchase_pos == -1:
        purchase_pos = content.find("id='purchase-options-container'")

    if jakim_pos == -1 or purchase_pos == -1:
        errors.append(f"Cannot find positions in: {p}")
        continue

    if jakim_pos < purchase_pos:
        # Card is BEFORE purchase container — need to move it AFTER
        # 1. Extract the JAKIM card HTML block
        # Find from comment to closing </div>\n of the outer div
        # Strategy: remove the card and re-insert after purchase-options-container closing div
        
        # Remove card from current position
        # Use a robust approach: find the block between <!-- Halal Certification Trust Card -->
        # and the closing </div> that closes the outer flex div
        start_comment = content.find('<!-- Halal Certification Trust Card -->')
        # Walk back to find the leading whitespace/newline
        # Find the outer container div that wraps the card
        # It's the div immediately before the comment
        
        # Find start of line containing the comment
        line_start = content.rfind('\n', 0, start_comment) + 1
        
        # Find the closing </div> of the outer card div (5 closing divs deep)
        # We know the structure: outer div contains 2 children
        # Let's find the </div> that closes it by counting depth
        search_from = start_comment
        depth = 0
        card_end = -1
        in_card = False
        i = search_from
        while i < len(content):
            if content[i:i+4] == '<div':
                depth += 1
                in_card = True
                i += 4
            elif content[i:i+6] == '</div>':
                if in_card:
                    depth -= 1
                    if depth == 0:
                        card_end = i + 6
                        break
                i += 6
            else:
                i += 1
        
        if card_end == -1:
            errors.append(f"Could not find card end in: {p}")
            continue

        # Extract the card text including leading newline/whitespace
        # Also capture any trailing newline
        card_end_with_newline = card_end
        if content[card_end:card_end+1] == '\n':
            card_end_with_newline = card_end + 1
        
        card_full = content[line_start:card_end_with_newline]
        
        # Remove the card from current location
        new_content = content[:line_start] + content[card_end_with_newline:]
        
        # Now find where to insert: after the closing </div> of purchase-options-container
        # purchase-options-container div:
        # <div id="purchase-options-container" ...> ... </div>
        poc_pos = new_content.find('id="purchase-options-container"')
        if poc_pos == -1:
            poc_pos = new_content.find("id='purchase-options-container'")
        
        # Find the opening tag start
        div_open_start = new_content.rfind('<div', 0, poc_pos)
        # Walk to find the matching closing div
        depth = 0
        poc_end = -1
        i = div_open_start
        while i < len(new_content):
            if new_content[i:i+4] == '<div':
                depth += 1
                i += 4
            elif new_content[i:i+6] == '</div>':
                depth -= 1
                if depth == 0:
                    poc_end = i + 6
                    break
                i += 6
            else:
                i += 1
        
        if poc_end == -1:
            errors.append(f"Could not find purchase container end in: {p}")
            continue

        # Insert HALAL_CARD right after purchase container's closing </div>
        insert_at = poc_end
        # Keep consistent newline
        if new_content[insert_at:insert_at+1] == '\n':
            insert_at += 1
        
        final_content = new_content[:insert_at] + '\n' + HALAL_CARD + new_content[insert_at:]
        
        with open(p, 'w', encoding='utf-8') as f:
            f.write(final_content)
        moved += 1
    else:
        already_correct += 1

print(f"\nResults:")
print(f"  Moved JAKIM card to below order buttons: {moved}")
print(f"  Already in correct position: {already_correct}")
if errors:
    print(f"  Errors: {len(errors)}")
    for e in errors:
        print(f"    {e}")

# ---- Part 2: Slim down button width in renderPurchaseVariants JS ----
print("\n--- Updating button widths ---")
OLD_BTN_CLASS = "btn.className = 'relative w-full text-center block bg-brand-crimson hover:bg-stone-900 text-white font-bold uppercase tracking-widest py-4 px-6 rounded-xl transition shadow-lg shadow-red-900/20 group my-2 cursor-pointer';"
NEW_BTN_CLASS = "btn.className = 'relative text-center block bg-brand-crimson hover:bg-stone-900 text-white font-bold uppercase tracking-widest py-3.5 px-6 rounded-xl transition shadow-md shadow-red-900/20 group my-2 cursor-pointer';"

btn_updated = 0
for p in prods:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    if OLD_BTN_CLASS in content:
        content = content.replace(OLD_BTN_CLASS, NEW_BTN_CLASS)
        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        btn_updated += 1

# Also update fallback purchase button for older pages
OLD_BTN_A = 'class="relative w-full text-center block bg-brand-crimson'
NEW_BTN_A  = 'class="relative text-center block bg-brand-crimson'

btn_a_updated = 0
for p in prods:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    if OLD_BTN_A in content:
        content = content.replace(OLD_BTN_A, NEW_BTN_A)
        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        btn_a_updated += 1

print(f"  Updated btn.className in JS: {btn_updated}")
print(f"  Updated fallback button class: {btn_a_updated}")

# Also wrap the purchase container in a constrained-width container
print("\n--- Wrapping purchase container in a max-width wrapper ---")
OLD_CONTAINER = '<div id="purchase-options-container" class="mt-10 space-y-4">'
NEW_CONTAINER  = '<div id="purchase-options-container" class="mt-8 space-y-3 max-w-sm">'
container_updated = 0
for p in prods:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    if OLD_CONTAINER in content:
        content = content.replace(OLD_CONTAINER, NEW_CONTAINER)
        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        container_updated += 1
print(f"  Constrained purchase-options-container width: {container_updated} files")

# Also update older style (class="mt-10" id="purchase-options-container")
OLD_CONTAINER2 = '<div class="mt-10" id="purchase-options-container">'
NEW_CONTAINER2  = '<div class="mt-8 max-w-sm" id="purchase-options-container">'
container2_updated = 0
for p in prods:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    if OLD_CONTAINER2 in content:
        content = content.replace(OLD_CONTAINER2, NEW_CONTAINER2)
        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        container2_updated += 1
print(f"  Constrained older purchase-options-container width: {container2_updated} files")

print("\nDone!")
