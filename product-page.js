document.addEventListener('DOMContentLoaded', function () {
  // This script assumes a `CURRENT_PRODUCT_NAME` constant is defined in the HTML before it's loaded.
  if (typeof CURRENT_PRODUCT_NAME === 'undefined') {
    console.error("`CURRENT_PRODUCT_NAME` is not defined in the HTML. Product page script cannot run.");
    return;
  }

  lucide.createIcons();

  function fetchPurchaseLink() {
    const sheetId = '1vKPPiD963CK5QLqZ3gwk__xGgnQ1wRgU6agEYMyiqvQ';
    const sheetName = 'RWB%20Products';
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    const buyButton = document.getElementById('buy-now-button');
    const buyLoading = document.getElementById('buy-now-loading');
    if (buyButton && buyLoading) {
      buyLoading.style.display = 'block';
    }

    fetch(sheetUrl)
      .then(response => response.text())
      .then(text => {
        const jsonString = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)[1];
        const data = JSON.parse(jsonString);
        const rows = data.table.rows;
        const headers = data.table.cols.map(col => col.label);
        const nameIndex = headers.indexOf('product_name');
        const linkIndex = headers.indexOf('whatsapp_product_link');

        const productRow = rows.find(row => row.c[nameIndex] && row.c[nameIndex].v.trim() === CURRENT_PRODUCT_NAME);

        if (buyButton) {
          if (productRow && productRow.c[linkIndex] && productRow.c[linkIndex].v) {
            buyButton.href = productRow.c[linkIndex].v;
          } else {
            buyButton.href = "https://wa.me/601154554438"; // Fallback link
            console.warn(`Purchase link for "${CURRENT_PRODUCT_NAME}" not found in Google Sheet.`);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching purchase link:', error);
        if (buyButton) buyButton.href = "https://wa.me/601154554438"; // Fallback on error
      })
      .finally(() => {
        if (buyButton && buyLoading) {
          buyLoading.style.display = 'none';
          buyButton.style.display = 'block';
        }
      });
  }

  function fetchRelatedRecipes() {
    const bloggerUrl = "https://blog.rempahwarisanbernam.net";
    const maxPostsToFetch = 50;

    window.handleRelatedRecipes = function(data) {
      if (window._bloggerFeedTimeout) clearTimeout(window._bloggerFeedTimeout);

      const recipesContainer = document.getElementById('related-recipes-container');
      const recipesLoading = document.getElementById('recipes-loading-indicator');
      if (recipesLoading) recipesLoading.style.display = 'none';
      if (!recipesContainer) return;

      if (!data || !data.feed || !data.feed.entry) {
        recipesContainer.innerHTML = '<p class="text-center text-stone-500">Could not load recipes at this time.</p>';
        return;
      }

      const recipeTags = ["Recipe", "Recipes", "AI-Generated Recipe"];
      const filteredEntries = data.feed.entry.filter(entry => {
        const categories = (entry.category || []).map(cat => cat.term.trim());
        const hasRecipeTag = categories.some(cat => recipeTags.includes(cat));
        const hasProductTag = categories.includes(CURRENT_PRODUCT_NAME);
        return hasRecipeTag && hasProductTag;
      });

      if (filteredEntries.length === 0) {
        recipesContainer.innerHTML = `<p class="text-center text-stone-500">No specific recipes found for ${CURRENT_PRODUCT_NAME} yet. <a href="/recipe.html" class="text-brand-crimson underline">Explore all recipes</a>.</p>`;
        return;
      }

      let postHtml = '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">';
      filteredEntries.forEach(post => {
        const postTitle = post.title.$t;
        const postUrl = post.link.find(link => link.rel === 'alternate').href;
        let thumbnailUrl = '/images/Rempah%20warisan%20logo%20final.png';
        if (post.media$thumbnail && post.media$thumbnail.url) {
          thumbnailUrl = post.media$thumbnail.url.replace('/s72-c/', '/w400-h225-c/');
        } else if (post.content && post.content.$t) {
          const contentDiv = document.createElement('div');
          contentDiv.innerHTML = post.content.$t;
          const firstImage = contentDiv.querySelector('img');
          if (firstImage) thumbnailUrl = firstImage.src;
        }
        postHtml += `
          <a href="${postUrl}" class="bg-white rounded-2xl shadow-lg overflow-hidden group block">
            <div class="aspect-w-16 aspect-h-9 bg-stone-100">
              <img src="${thumbnailUrl}" alt="${postTitle}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='/images/Rempah%20warisan%20logo%20final.png'">
            </div>
            <div class="p-6">
              <h3 class="font-serif text-xl italic text-stone-900">${postTitle}</h3>
            </div>
          </a>`;
      });
      postHtml += '</div>';
      recipesContainer.innerHTML = postHtml;
    };

    const script = document.createElement('script');
    script.src = `${bloggerUrl}/feeds/posts/default?alt=json-in-script&max-results=${maxPostsToFetch}&callback=handleRelatedRecipes`;
    
    window._bloggerFeedTimeout = setTimeout(() => {
      const recipesContainer = document.getElementById('related-recipes-container');
      if (recipesContainer) recipesContainer.innerHTML = '<p class="text-center text-stone-500">Recipe feed timeout. Please try again later.</p>';
    }, 8000);

    script.onerror = () => {
      if (window._bloggerFeedTimeout) clearTimeout(window._bloggerFeedTimeout);
      const recipesContainer = document.getElementById('related-recipes-container');
      if (recipesContainer) recipesContainer.innerHTML = '<p class="text-center text-stone-500">Error loading recipes.</p>';
    };

    document.head.appendChild(script);
  }

  // Run the functions
  fetchPurchaseLink();
  fetchRelatedRecipes();
});