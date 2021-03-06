<script async>
    // 4. Conditionally load the webcomponents polyfill if needed by the browser.
    // This feature detect will need to change over time as browsers implement
    // different features.
    var webComponentsSupported = ('registerElement' in document
        && 'import' in document.createElement('link')
        && 'content' in document.createElement('template'));

    if (!webComponentsSupported) {
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://polygit.org/components/webcomponentsjs/webcomponents-lite.js';
        script.onload = finishLazyLoading;
        document.head.appendChild(script);
    } else {
        finishLazyLoading();
    }

    function finishLazyLoading() {
        // (Optional) Use native Shadow DOM if it's available in the browser.
        window.Polymer = window.Polymer || {dom: 'shadow'};

        var links = document.getElementsByClassName('sprout-components');
        var loaded = 0;
        var timeout = 0;

        var timer = setInterval(function() {
            timeout++;
        }, 1000);

        // 6. Fade splash screen, then remove.
        var onImportLoaded = function() {
            loaded++;

            if (loaded >= links.length || timeout >= 1) {
                document.body.classList.add('loaded');
                clearInterval(timer);
            }
            // App is visible and ready to load some data!
        };

        // 5. Go if the async Import loaded quickly. Otherwise wait for it.
        // crbug.com/504944 - readyState never goes to complete until Chrome 46.
        // crbug.com/505279 - Resource Timing API is not available until Chrome 46.
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (link.import && link.import.readyState === 'complete') {
                onImportLoaded();
            } else {
                link.addEventListener('load', onImportLoaded);
            }
        }
    }
</script>

<style>
    body {
        opacity: 0;
    }
    body.loaded {
        opacity: 1;
    }
</style>
