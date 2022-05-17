export const getCookie = (name: string): string | undefined =>  {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const setCookie = (name: string, value: string | number | boolean, props?: any ) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export const deleteCookie = (name: string) => {
  setCookie(name, false, { expires: -1 });
}

export const getShortToken= () => {
  let shortToken = getCookie('accessToken');
  if (shortToken) {
    return shortToken = shortToken.split('Bearer ')[1]
  } else {
    return  shortToken = '';
  }
}