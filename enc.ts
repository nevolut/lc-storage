const enc = {
  encode: (data: string) => {
    return btoa(data);
  },
  decode: (data: string) => {
    return atob(data);
  }
};

export default enc;
