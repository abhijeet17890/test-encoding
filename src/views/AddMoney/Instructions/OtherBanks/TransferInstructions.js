export const TransferInstructions =[
    {
        content: 'Initiate a wire transfer from your bank account, either through your online banking system or from your local bank branch.'
    },
   
    {
        content: 'Use the details provided below as the beneficiary details when completing the wire transfer instructions.',
        table: true,
        title_one:'Beneficiary Details',
        description_one:[
            'Beneficiary Name: DriveWealth, LLC',
            'Beneficiary Address: 97 Main St 2nd Floor Chatham, NJ 07928 USA',
            'Beneficiary Bank: M and T Bank',
            'Beneficiary Account Number: 9870304186',
            'Beneficiary Bank Address: One M and T Plaza, 345 Main Street, Buffalo, NY 14203 USA',
            'Beneficiary Bank’s SWIFT Code: MANTUS33',
            'Beneficiary ABA / Fedwire Routing Number: 022000046',
        ],
        title:'details',
        subcontent: 'If there is a section to input further information for beneficiary (eg reference, message, instructions to beneficiary), please input your Name and Account Number'
    },
    
    {
        content:'Use the details provided below for the Purpose of Remittance when completing the wire transfer instructions for a remittance under LRS.',
        description: ['Purpose Code: S0001',"Purpose of Remittance / Purpose Description: Indian portfolio investment abroad - in equity shares"]
    },
    {
        content:'Send an email to customers@globalise.co with the following information so we can trace your transfer:',
        description: ['Your name (as on your Globalise account):',"Source: Your Bank's name","Amount transferred (in USD):"]
    },
    {
        content:'You will receive a confirmation email once the money is received in your Globalise account. '
    },

]