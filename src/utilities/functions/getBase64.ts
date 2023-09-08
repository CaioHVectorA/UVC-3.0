export async function getBase64(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    
    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}