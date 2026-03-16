
async function fetchAPI(url, options) {

    try {
    
        // await is replicating a promise .then() statement
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`action: ${options.method}; status: ${response.status}`);
        }
  
        // another replication of .then() statement
        const responseData = await response.json();
  
        return responseData;
  
    } catch (error) {
  
      throw new Error(error.message)
    }
  
  }
  
  export { fetchAPI }