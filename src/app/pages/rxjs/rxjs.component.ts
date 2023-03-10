import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

    intervalSubs: Subscription | undefined

  constructor() {




    // this.retornaObservable().pipe(
    //   retry(2)
    // )
    // .subscribe(
    //   valor=>console.log('Subs: ',valor),
    //   err => console.warn('Error ',err),
    //   ()=> console.info('Obs finish')


    // )
    this.intervalSubs=this.retornaIntervalo().subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe()
  }

  ngOnInit(): void {
  }

  retornaIntervalo():Observable<number>{
    return interval(300)
        .pipe(
          // take(10),
          map(valor => valor +1),
          filter(valor => (valor%2==0)?true:false),
        );
    // return intervalo$
  }

  retornaObservable():Observable<number>{
    let i= -1;
    return new Observable<number>( observer =>{

      const intervalo=setInterval(()=>{
        i++
        observer.next(i)
        if(i===4){
          clearInterval(intervalo)
          observer.complete();
        }
        if(i===2){
          observer.error('I llego al valor de 2')
        }
      },1000)

    });
  }

}
