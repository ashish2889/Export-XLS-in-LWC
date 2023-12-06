import { LightningElement ,wire} from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountExportController.getAllAccounts';

const columns = [
    {label:'Name',fieldName:'Name',type:'text',sortable:"true"},
    {label:'Phone',fieldName:'Phone',type:'phone',sortable:"true"},
    {label:'Website',fieldName:'Website',type:'url',sortable:"true"},
    {label:'Fax',fieldName:'Fax',type:'phone',sortable:"true"},
    {label:'Type',fieldName:'Type',type:'text',sortable:"true"}
];
export default class ExportCSVXLSComponent extends LightningElement {
    accountData;
    columns = columns;
    columnsHeader= ['Id','Name','Phone','Website','Fax','Type'];


    @wire(getAllAccounts)
    wireAccountData({error,data}){
        if(data){
            this.accountData = data;
        }else if(error){
            console.error('--- error occur when fetching Account data--',error);
        }
    }

    //export scv/xls data
    exportHandle(){
        let doc = '<table>';
        //Add style for the table
        doc+= '<style>';
        doc+='table, th,td{';
        doc+= 'border: 1px solid black;';
        doc+='border-collapse:collapse;';
        doc+='}';
        doc+='</style>';
        //Add all the Table Headers
        doc+='<tr>';
        this.columnsHeader.forEach(head=>{
            doc+='<th style="color:red;">'+head+'</th>';
        });
        doc+='</tr>';
        //Add the data table rows
        this.accountData.forEach(acc=>{
            doc+='<tr>';
            doc+='<td style="color:green;background-color:yellow;">'+acc.Id+'</td>';

            if(acc.Name.startsWith('S') || acc.Name.startsWith('s')){
            doc+='<td style="color:white;background-color:#0176D3;font-weight:bold;">'+acc.Name+'</td>';
            }else{
                doc+='<td style="color:white;background-color:red;">'+acc.Name+'</td>';  
            }

            if(acc.Phone){
                doc+='<td>'+acc.Phone+'</td>';
            }else{
               doc+='<td>'+''+'</td>';
            }
            if(acc.Website){
                 doc+='<td>'+acc.Website+'</td>';
            }else{
                doc+='<td>'+''+'</td>';
            }
           if(acc.Fax){
            doc+='<td>'+acc.Fax+'</td>';
           }else{
           doc+='<td>'+''+'</td>';
           }
            if(acc.Type){
                doc+='<td>'+acc.Type+'</td>';
            }else{
                doc+='<td>'+''+'</td>';
            }
            
            doc+='</tr>';
        });
        doc+='</table>';
        var element = 'data:application/vnd.ms-excel,'+encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        downloadElement.download = 'Account Data.xls';//use .csv as extension if you want to export csv file
        document.body.appendChild(downloadElement);
        downloadElement.click();

    }


}