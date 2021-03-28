export default class MainService {
  static load(callBack) {
    setTimeout(() => {
      callBack();
    }, 3000);
  }
}
