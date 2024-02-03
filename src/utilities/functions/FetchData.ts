type res = {
  error?: any;
  data: any;
  status: number;
};

export default function fetchData(URL: string): Promise<res> {
  return new Promise((resolve, reject) => {

    fetch(URL, { next: { revalidate: 10 } })
    .then((res) => res.json())
    .then((data) => {
      resolve({
        error: null,
        data,
        status: 200,
      })
    })
    .catch((err) => {
      reject(err)
    });
  })
  }
