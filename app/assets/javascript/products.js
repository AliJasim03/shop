// This app uses turbolinks
document.addEventListener("turbolinks:load", function() {
  var productImage = document.querySelector('.product-image');

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    if (!files || files.length === 0) return;

    // Get the list element
    var list = document.getElementById('list');
    if (!list) return;

    // Clear the list before adding new thumbnails
    list.innerHTML = '';

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="product-preview-thumb" src="', e.target.result,
            '" title="', escape(theFile.name), '"/>'
          ].join('');
          if (list) {
            list.appendChild(span);
          }
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  if (productImage) {
    productImage.addEventListener('change', handleFileSelect, false);
    // Mark this event as attached to prevent duplicate handlers
    window.productImageHandlerAttached = true;
  }
});