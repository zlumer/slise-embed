// EMBED EXAMPLE:
//
// <script async src="https://gist.githubusercontent.com/zlumer/c1f5d59b0a55f0e21a042df36d3b37cd/raw/embed.js?r=123"></script>
// <ins
//     class="adsbyslise"
//     style="display:inline-block;width:728px;height:90px"
//     data-ad-client="pub-12345"
//     data-ad-slot="123456"
//  ></ins>
// <script>;(adsbyslise=window.adsbyslise||[]).push({slot:123456});window.adsbyslisesync&&window.adsbyslisesync();</script>
//

;(function()
{
	function substWithIframe(elem, url)
	{
	  // Get width and height of parent element
	  var width = elem.style.width;
	  var height = elem.style.height;

	  // Create new iframe element
	  var iframe = document.createElement("iframe");

	  // Set attributes for iframe
	  iframe.src = url;
	  iframe.width = width;
	  iframe.height = height;

	  // Replace content of parent element with iframe
	  elem.innerHTML = "";
	  elem.appendChild(iframe);
	}
	
	var AD_SERVE_URL = "https://slise-asp-lazy-pheasant-78.deno.dev"
	
	function syncAds(arr)
	{
		for (var i = 0; i < arr.length; i++)
		{
			var val = arr[i];
			var elem = document.querySelector('ins[data-ad-slot="'+ val.slot +'"]');
			if (!elem)
				continue;
			
			substWithIframe(elem, AD_SERVE_URL);
		}
	}
	
	window.adsbyslisesync = function()
	{
		var arr = window.adsbyslise
		if (!arr || !arr.length)
			return
		
		window.adsbyslise = []
		
		syncAds(arr)
	}
})();
