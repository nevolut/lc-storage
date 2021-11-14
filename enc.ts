const enc = {
  encode: (value: string) => {
    return btoa(value);
  },
  decode: (value: string) => {
    return atob(value);
  }
};

export default enc;
