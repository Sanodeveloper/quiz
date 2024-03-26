import { defineStore } from 'pinia'
import type { User, Question } from '@/interfaces';

interface Quiz {
  id:number,
  diff: string;
  lec: string;
}


type Objkeylang = keyof User['quiz'];
type Objkeydiff = keyof User['quiz']['html5'];
type Objkeylec = keyof User['quiz']['html5']['1'];

interface Quiz_Array {
  quizHTML5: Array<Quiz>;
  quizCSS3: Array<Quiz>;
  queshtml5: Array<Question>;
  quescss3: Array<Question>;
  user: User;
  isLogin: boolean;
}

//--------  function ------------------------------------------------
async function updataCorrectNum(name: string, pass: string ,lang: string, diff:string, lec:string, num:number):Promise<void> {
  fetch('https://looquiz.net/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name, pass: pass, lang: lang, diff: diff, lec: lec, num: num})
  });
}

async function getQuiz(quiz:string) {
  const data = await fetch('https://looquiz.net/api/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({quiz: quiz})
  }).then( res =>{
    return res.json();
  }).then(data=>{
    return data;
  })
  return data;
}


export const useDatabaseStore = defineStore( "database", {
  state: (): Quiz_Array => {
    return {
      quizHTML5: [
      ],
      quizCSS3: [
      ],
      queshtml5: [
      ],
      quescss3: [
      ],
      user: {
        name: "",
        pass: "",
        quiz: {
          html5: {
            '1': {
              '1-1':0,
              '1-2':0,
              '1-3':0,
              '1-4':0,
              '1-5':0,
            },
            '2': {
              '1-1':0,
              '1-2':0,
              '1-3':0,
              '1-4':0,
              '1-5':0,
            },
            '3': {
              '1-1':0,
              '1-2':0,
              '1-3':0,
              '1-4':0,
              '1-5':0,
            }
          },
          css3: {
            '1': {
              '1-1':0,
              '1-2':0,
              '1-3':0,
              '1-4':0,
              '1-5':0,
            },
            '2': {
              '1-1':0,
              '1-2':0,
              '1-3':0,
              '1-4':0,
              '1-5':0,
            },
            '3': {
              '1-1':0,
              '1-2':0,
              '1-3':0,
              '1-4':0,
              '1-5':0,
            },
          }
        }
      },
      isLogin: false
    }
  },
  getters: {
    getQuiz: (state) => {
      return ( lang:string ): (Array<Quiz> | undefined) => {
        if(lang === "html5") {
          return state.quizHTML5;
        } else if(lang === "css3") {
          return state.quizCSS3;
        } else {
          return undefined;
        }
      }
    },
    getQues: (state) => {
      return (lang:string, diff:string, lec:string):(Array<Question> | undefined) => {
        if(lang === "html5") {
          const HTMLARRAY = state.queshtml5.filter((value)=>{
            if(value.diff === diff && value.lec === lec) {
              return value;
            }
          }) as Array<Question>;
          return HTMLARRAY;
        } else if(lang === 'css3') {
          const CSSARRAY = state.quescss3.filter((value) => {
            if(value.diff === diff && value.lec === lec) {
              return value;
            }
          }) as Array<Question>;
          return CSSARRAY;
        } else {
          return undefined;
        }
      }
    },
    getUserCorrectNum: (state) => {
      return (lang: string, diff:string, lec:string):number => {
        return state.user.quiz[lang as Objkeylang][diff as Objkeydiff][lec as Objkeylec];
      }
    },
    getUser: (state):User => {
        return state.user;
    }
  },
  actions: {
    async insertquiz(quiz: string){
      const data = await getQuiz(quiz);
      if(quiz === 'quizhtml5') {
        this.quizHTML5 = data;
      } else if(quiz === 'quizcss3') {
        this.quizCSS3 = data;
      } else if(quiz === 'queshtml5') {
        this.queshtml5 = data;
      } else if(quiz === 'quescss3') {
        this.quescss3 = data;
      }
    },
    updata(lang: string, diff:string, lec:string, num:number):void {
        this.user.quiz[lang as Objkeylang][diff as Objkeydiff][lec as Objkeylec] = num;
        updataCorrectNum(this.user.name, this.user.pass, lang, diff, lec, num);
    },
    updataUser(user:User ): void {
      this.user = user;
    },
    Logined():void {
      this.isLogin = true;
    },
  }
});
