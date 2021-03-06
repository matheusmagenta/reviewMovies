import { TIMEOUT_SEC } from "./config.js";

/////////////
// TIMEOUT //
/////////////
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

///////////////////////
// GET JSON FROM API //
///////////////////////

export const getJSON = async function (url) {
  try {
    const response = await fetch(url); // Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // console.log("response: ", response);
    const dataResult = await response.json();
    //console.log("dataResults: ", dataResult);

    if (!response.ok)
      throw new Error(`${dataResult.message} (${response.status})`);

    return dataResult;
  } catch (err) {
    throw err;
  }
};

/*   const response = await fetch(
    `${API_URL}movie/${id}?api_key=${apiKey}&language=en-US`
  );
 */
