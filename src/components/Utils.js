export default class Utils {
  static numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static parseDate = (x, g) => {
    const date = x.split(' ')[0].split('-');
    const gb = g ? g : '.';
    return `${date[1]}${gb}${date[2]}`;
  }
  
  static detailDay = term => {
    let str = '';
    switch(term.detailDay) {
      case 128: str += '. 협의'; break;
      case 127: str += '. 매일'; break;
      case 65: str += '. 주말'; break;
      case 62: str += '. 주중'; break;
      default: {
        let l = '';
        l = term.detailDay & 64 ? ', 일' : '';
        l += term.detailDay & 32 ? ', 월' : '';
        l += term.detailDay & 16 ? ', 화' : '';
        l += term.detailDay & 8 ? ', 수' : '';
        l += term.detailDay & 4 ? ', 목' : '';
        l += term.detailDay & 2 ? ', 금' : '';
        l += term.detailDay & 1 ? ', 토' : '';
        str += l;
        break;
      }
    }
    return str;
  }

  static alertError = e => {
    if(e.response) {
      if(e.response.data && e.response.data.message) {
        alert(e.response.data.message);
      } else if(e.response.data) {
        alert(e.response.data);
      } else {
        alert(e.response);
      }
    } else {
      alert(e);
    }
    console.log(e);
  }
}