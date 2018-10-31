export interface AnswerData {

}

export interface Answer {
   uuid: string;
   fail: boolean;
   data: AnswerData;
   error: Error;
}
