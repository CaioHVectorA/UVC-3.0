export const formatURL = (string: string) => string.replaceAll('-',' ').replace(/%C3%A3/g, "ã").replace(/%C3%A1/g, "á").replace(/%7E/g, "~").replace(/%5E/g, "^").replace(/%C2%B4/g, "´")