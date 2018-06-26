/**
 * Series Page
 * 
 * If is in the Series Page, run the code accordingly.
 */
if (document.querySelector('#series.page')) {

  // List Categories and Videos
  var categories = document.querySelectorAll(".series-category");
  var videos = document.querySelectorAll('.video-list');

  // Slice Categories to make it an array
  var categoriesArray = [].slice.call(this.categories);

  /**
   * Loop through Categories to add Event Listeners.
   */
  categoriesArray.forEach(function (category, index) {
    category.addEventListener('click', function (e) {
      // Prevent click default, so page won't scroll to section's ID
      e.preventDefault();

      // Remove active categories before anything.
      removeActiveCategories();

      // If category is clicked, activate it.
      category.classList.add('active');
      videos[index].classList.add('active');

      // If has Storage, save activeCategory.
      if (hasStorage) {
        localStorage.setItem('activeCategory', index);
      }
    })
  })

  /**
   * Check if URL has a hash
   * 
   * If true, activate the category according to the class selected in the hash.
   * 
   */
  if (window.location.hash) {

    // Gets the substring of the hash
    var hash = window.location.hash.substring(1);

    // Loops through Categories
    categoriesArray.forEach(function (category, index) {
      
      // Checks if category hash matches url's
      if (category.hash.substring(1) == hash) {

        // Remove active categories
        removeActiveCategories();

        // Activate selected category
        addClass(category, 'active');
        addClass(videos[index], 'active');

        // If has Storage, set active Category
        if (hasStorage) {
          localStorage.setItem('activeCategory', index);
        }
      }
    });

    /**
     * Else, check if has active category stored in LocalStorage, and activate it.
     */
  } else {
    
    // Check if has Local Storage
    if (hasStorage) {

      // Get active category
      var activeCategory = localStorage.getItem('activeCategory');

      // If it isn't null, activate the right category
      if (!!activeCategory) {

        removeActiveCategories();

        addClass(categories[activeCategory], 'active');
        addClass(videos[activeCategory], 'active');
      }
    }
  }

  /**
   * Remove Active Categories
   */
  function removeActiveCategories() {
    if (hasClass(document.querySelector('.series-category.active'), 'active')) {
      removeClass(document.querySelector('.series-category.active'), 'active');
      removeClass(document.querySelector('.video-list.active'), 'active');
    }
  }
} 


/**
 * Video Page
 * 
 * If is in the Video Page, run the code accordingly.
 */
if (document.querySelector('#video.page')) {

  var openVideo = document.getElementById('open-video'),
      watchTheVideo = document.getElementById('watch-the-video'),
      closeTheVideo = document.getElementById('close-the-video');

  openVideo.addEventListener('click', function(e){
    e.preventDefault();

    addClass(watchTheVideo, 'active');

    playVideo();
  });

  closeTheVideo.addEventListener('click', function() {
    removeClass(watchTheVideo, 'active');

    pauseVideo();
  });
}
