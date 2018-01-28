import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

export class Translation {
  guesses: string[];
  resp: string;
}

@Injectable()
export class RemoteService {

  constructor(private http: HttpClient) {
  }

  checkMeaning(inputText: string): Observable<Translation> {
    return this.http.get<Translation>("http://51.15.84.64:8080/api/nlp", {
      params: {'q': inputText}
    });
  }

}
