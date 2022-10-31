const getPlainList = (rowsList: Array<Array<any>>): Array<any> =>
  rowsList.length > 0
    ? rowsList.reduce((prev = [], curr) => prev.concat(curr))
    : [];

export default getPlainList;
