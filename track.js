// EMBED EXAMPLE:
//
// <script async src="https://slise.xyz/scripts/embed.js"></script>
//

;(function()
{
  var ENDPOINT = "http://localhost:3001/track";
  var LS_KEY = "slise:client:id";
  
  function getLocale()
  {
    // TODO: Intl.DateTimeFormat().resolvedOptions().locale
    return (navigator.languages && navigator.languages[0]) || navigator.language;
  }
  function getLocalStorageValue()
  {
    // TODO: pass message to embedded iframe
    return Promise.resolve(localStorage.getItem(LS_KEY));
  }
  function setLocalStorageValue(client_id)
  {
    // TODO: pass message to embedded iframe
    localStorage.setItem(LS_KEY, client_id);
  }
  /*async*/ function getMetamaskInfoAsync()
  {
    var metamask_installed = (typeof window.ethereum != "undefined) && window.ethereum.isMetaMask;
    if (!metamask_installed)
      return Promise.resolve({
        metamask_installed: false
      })
    
    return window.ethereum.request({ method: "eth_accounts" }).then(function (accounts)
    {
      return {
        metamask_installed: true,
        metamask_connected: accounts.length > 0,
        accounts: accounts
      }
    })
  }
  function collectData()
  {
    var locale = getLocale();
    Promise.all([getLocalStorageValue(), getMetamaskInfoAsync()]).then(function(results)
    {
      var lstorage = results[0];
      var data = results[1];
      sendData({
        locale: locale,
        lstorage: lstorage,
        ...data,
      })
    });
  }
  function sendData(data)
  {
    console.log("SENDING TRACKING DATA")
    fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
    }).then(function(result)
    {
      return result.json().then(function(json)
      {
        let clientId = json.client_id
        if (clientId)
          setLocalStorageValue(clientId)
      })
    })
  }
})();
