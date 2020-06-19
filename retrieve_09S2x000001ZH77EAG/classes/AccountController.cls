public class AccountController {
    //method to retun list of accounts 
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountRecords(String accountNamePhrase, Integer numberOfRecords){
      
       	 String key = '%' + accountNamePhrase + '%';
        List<Account> accountList = [SELECT id, name, NumberOfEmployees, Website, AccountNumber from Account WHERE Name LIKE :key LIMIT :numberOfRecords];
        return accountList; 
    }
}