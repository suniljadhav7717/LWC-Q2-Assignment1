import { LightningElement, wire, track } from 'lwc';

import getAccountRecords from '@salesforce/apex/AccountController.getAccountRecords';

export default class AccountSearchComponent extends LightningElement {

    @track accounts;
    @track error;
    @track accountNamePhrase;
    @track numberOfRecords;
    @track filterText;
    @track copiedAccounts;
    
    // Handling input value change for var:accountNamePhrase
    handleNameValue(event){
    this.accountNamePhrase  =   event.target.value;

   }
   // Handling input value change for var:numberOfRecords
   handleRecordsValue(event){

    this.numberOfRecords              =   event.target.value;

   }

   // This functions calls the apex method:AccountController.getAccountRecords
    pullAccounts(event){
        
        // Calling apex method with accountNamePhrase and numberOfRecords parameters
        getAccountRecords({accountNamePhrase: this.accountNamePhrase , numberOfRecords: this.numberOfRecords} )
            .then(result => {
                this.accounts = result; this.copiedAccounts= [...this.accounts];
                console.log('Server method called',+ result)
            })
            .catch(error => {
                this.error=error;
            });
    }

    // This functions takes care of local filtering using filterText value 
    filterAccounts(event){
        this.filterText= event.target.value;
        this.copiedAccounts = this.accounts.filter(tempAcc => tempAcc.Name.toLowerCase().includes(this.filterText.toLowerCase()));
    }


}