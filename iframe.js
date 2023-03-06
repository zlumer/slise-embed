;(function()
{
  var ANAL_ENDPOINT = "https://slise-anal-busy-fox-52.deno.dev"
  var AD_ID = ""
  console.log("SLISE IFRAME INIT STARTED...")
  __init__();
  
  function trackView()
  {
    // track view
    fetch(ANAL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ ad: AD_ID, event: "view" }),
    })
  }
  function trackClick()
  {
    // track click
    fetch(ANAL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ ad: AD_ID, event: "click" }),
    })
  }
  function initTrackers(target)
  {
    var options = {
//       root: document.querySelector("#banner-ad"),
//       rootMargin: "0px",
      threshold: 1.0,
    };
    var HAS_SHOWN = false;
    function callback(entries)
    {
      var entry = entries[0]
      if (!entry)
        return
      if (!entry.isIntersecting)
        return
      
      if (!HAS_SHOWN)
        trackView();
      
      HAS_SHOWN = true;
    }

    var observer = new IntersectionObserver(callback, options);
    observer.observe(target);
    
    target.addEventListener("click", trackClick);
  }
  function __init__()
  {
    var elem = document.getElementById("banner-ad")
    if (!elem)
      console.error("SLISE: couldn't find the ad element!")
    AD_ID = elem.getAttribute("data-ad-id")
    if (elem.complete)
      initTrackers(elem)
    else
      elem.addEventListener('load', function(){initTrackers(elem)})
  }
})();
