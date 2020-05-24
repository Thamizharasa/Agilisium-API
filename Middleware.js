var WalletModel = require('./mongo/Model/Walletmodel');

         


var getWallet = async function()
{
    try
    {
        
        return await WalletModel.find();
    }
    catch(err)
    {
        return err;
    }
}

// var GetTemplateName = async function()
// {
//     try
//     {
//       return  await version.find({},{_id:0});
//     }
//     catch(err)
//     {
//         return err;
//     }
// }



var deleteWallets = async function(req)
{
    try
    {
        return await WalletModel.deleteOne({_id:req.body.id})
    }
    catch(err)
    {
        return err;
    } 
}

var AddWallet = async function(req)

{
   console.log(req.body);

	var WltModel = new WalletModel({
        WalletDate: req.body.WalletDate,
		Description : req.body.Description,
        Type :req.body.Type,
        Amount : req.body.Amount    
    });
    
  try
  {
        return {_id} = await WltModel.save();
  }
  catch(err)
  {
      console.log(err);
       return err;
  }

 }

var EditWallet = async function(req)
{
       
   try {

    return doc = await WalletModel.findOneAndUpdate(
        { _id: req.body.id },
        { $set: {
            WalletDate: req.body.WalletDate,
            Description : req.body.Description,
            Type :req.body.Type,
            Amount : req.body.Amount    
        } },
        { upsert: true, new: true }
      );


    }

    catch(err)
    {
      console.log(err)
    }

}



module.exports={
    getWallet :getWallet,
    AddWallet :AddWallet,
    deleteWallets:deleteWallets,
    EditWallet:EditWallet
   }