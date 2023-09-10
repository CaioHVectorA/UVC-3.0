type res = {
  error?: any;
  data: any;
  status: number;
};

export default function fetchData(URL: string): Promise<res> {
  return fetch(URL, { next: { revalidate: 10 }, cache: 'default' })
    .then((res) => res.json())
    .then((data) => {
      return {
        error: null,
        data,
        status: 200,
      };
    })
    .catch((err) => {
      return {
        error: err,
        data: null,
        status: 404,
      };
    });
}
