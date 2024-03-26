export interface User {
    name: string;
    pass: string;
    quiz: {
      html5: {
        '1': {
          '1-1':number;
          '1-2':number;
          '1-3':number;
          '1-4':number;
          '1-5':number;
        };
        '2': {
          '1-1':number;
          '1-2':number;
          '1-3':number;
          '1-4':number;
          '1-5':number;
        };
        '3': {
          '1-1':number;
          '1-2':number;
          '1-3':number;
          '1-4':number;
          '1-5':number;
        };
      };
      css3: {
        '1': {
          '1-1':number;
          '1-2':number;
          '1-3':number;
          '1-4':number;
          '1-5':number;
        };
        '2': {
          '1-1':number;
          '1-2':number;
          '1-3':number;
          '1-4':number;
          '1-5':number;
        };
        '3': {
          '1-1':number;
          '1-2':number;
          '1-3':number;
          '1-4':number;
          '1-5':number;
        };
      };
    }
  }

export interface Question {
  id:number;
  diff:string;
  lec:string
  text:string;
  one: string;
  two: String;
  three: string;
  correctans: string;
  explan_text:string;
}