const removeUndefinedProps = (obj: any) => {
  if (!(typeof obj === 'object')) {
    return ;
  }
  const objKeys = Object.keys(obj);
  const objNoUndefined = objKeys
    .reduce((returnObj: any, prop: string) => obj[prop] !== undefined ? {...returnObj, [prop]: obj[prop]} : returnObj, {});
  return objNoUndefined;
}

export default removeUndefinedProps;