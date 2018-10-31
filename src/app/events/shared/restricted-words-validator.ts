import { FormControl } from "@angular/forms";

    //this is a custom validator, making sure that the specified words are not present
export function restrictedWords(words: string[]) {
    return (control: FormControl) : {[key:string]: any} => { 

        if(!words){
            return null;
        }
            
        var invalidWords = words.map(w => control.value.includes(w) ? w : null)
        .filter(w => w != null);

        return invalidWords && invalidWords.length > 0 ? {'restrictedWords': invalidWords.join(',')}: null;
    }
}