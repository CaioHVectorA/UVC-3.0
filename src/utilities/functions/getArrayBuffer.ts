export async function getArrayBuffer(file: any): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      
      reader.onload = function () {
        if (!reader || !reader?.result) return reject('Ocorreu um erro.')
        resolve(reader.result as ArrayBuffer);
      };
  
      reader.onerror = function (error) {
        reject(error);
      };
  
      reader.readAsArrayBuffer(file);
    });
  }