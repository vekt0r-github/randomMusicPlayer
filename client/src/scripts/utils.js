const random = (min, max) => Math.floor(Math.random() * (max - min)) + min; // [min, max)

/**
 * @param {Array} x 
 * @returns a random element from x
 */
export const randomChoice = (x) => x[random(0, x.length)];

// for negative numbers
export const mod = (m, n) => ((m % n) + n) % n;

// convert a fetch result to a JSON object with error handling for fetch and json errors
function convertToJSON(res) {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }

  return res
    .clone() // clone so that the original is still readable for debugging
    .json() // start converting to JSON object
    .catch((error) => {
      // throw an error containing the text that couldn't be converted to JSON
      return res.text().then((text) => {
        throw `API request's result could not be converted to a JSON object: \n${text}`;
      });
    });
}

// Helper code to make a get request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function get(endpoint) {
  const fullPath = endpoint;
  return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw `GET request to ${fullPath} failed with error:\n${error}`;
    });
}

// Helper code to make a post request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function post(endpoint, params = {}) {
  return fetch(endpoint, {
    method: "post",
    // headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw `POST request to ${endpoint} failed with error:\n${error}`;
    });
}

/**
 * splits a string by the dot before file extension
 * @param {String} fn 
 * @returns object {name, ext}
 */
export const splitFilename = (fn) => {
  let dot = fn.lastIndexOf('.');
  let ext = fn.substr(dot + 1);
  let name = fn.substr(0, dot);
  return {name, ext};
};

export const readFileBinary = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
}

export const getAudioHandle = async (osuDirectoryHandle, beatmap) => {
  try {
    const songsHandle = await osuDirectoryHandle.getDirectoryHandle("Songs");
    const folderHandle = await songsHandle.getDirectoryHandle(beatmap.folder_name);
    return await folderHandle.getFileHandle(beatmap.audio_file_name);
  } catch (error) {
    console.log(error, beatmap);
    return null;
  }
}

export const scrollIfNeeded = (element, container) => {
  if (element.offsetTop < container.scrollTop) {
    container.scrollTop = element.offsetTop;
  } else {
    const offsetBottom = element.offsetTop + element.offsetHeight;
    const scrollBottom = container.scrollTop + container.offsetHeight;
    if (offsetBottom > scrollBottom) {
      container.scrollTop = offsetBottom - container.offsetHeight;
    }
  }
}