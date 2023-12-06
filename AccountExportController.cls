public with sharing class AccountExportController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        List<Account> accData = [SELECT Id,Name,Phone,Website,Fax,Type from Account];
        return accData;
    }
}