const fakeClientsDB = [
  {
   name:'default',
   pricingRules: [
   ]
  },
  {
   name:'Unilever',
   pricingRules: [
     {
       type: 'Reduction_Deal',
       buyingBase: 3,
       reductionBase: 2,
       plan:'classic'
     }
   ]
  },
  {
   name:'Apple',
   pricingRules: [
     {
       type: 'Standard_Reduced_Price',
       plan: 'standout',
       price: 299.99
     }]
  },
  {
   name:'Nike',
   pricingRules: [
     {
       type: 'Reduced_Price_Bulk',
       buyingBase: 4,
       plan: 'premium',
       price: 379.99
     }]
  },
  {
   name:'Ford',
   pricingRules: [
     {
       type: 'Reduction_Deal',
       buyingBase: 5,
       reductionBase: 4,
       plan:'classic'
     },
     {
       type: 'Standard_Reduced_Price',
       plan: 'standout',
       price: 309.99
     },
     {
       type: 'Reduced_Price_Bulk',
       buyingBase: 3,
       plan: 'premium',
       price: 389.99
     }
   ]
  }

]

export default fakeClientsDB
