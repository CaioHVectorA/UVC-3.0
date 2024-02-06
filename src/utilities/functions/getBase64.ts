export async function getBase64(file: any): Promise<string> {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    
    reader.onload = function () {
      if (!reader || !reader?.result) return reject('Ocorreu um erro.')
      resolve(reader.result.toString());
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}