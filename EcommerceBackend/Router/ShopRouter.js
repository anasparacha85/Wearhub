const express=require('express')
const AuthenticatedUser=require('../Middleware/AuthenticatedUser')
const {shopItems,popularItems,toptrendingItems,MensItems,WomensItems,Sayaitems,Bonaanzaitems,Khaadiitems,jitems,findproductbyid,findproductbybrandname}=require('../Controller/ShopController')
const router=express.Router();
router.route('/ShopItems').get(shopItems)
router.route('/WearhubPopular').get(popularItems)
router.route('/TopTrending').get(toptrendingItems)
router.route('/mens').get(MensItems)
router.route('/womens').get(WomensItems)
router.route('/khaadi').get(Khaadiitems)
router.route('/bonanza').get(Bonaanzaitems)
router.route('/j.').get(jitems)
router.route('/saya').get(Sayaitems)
router.route('/Product/:id').get(AuthenticatedUser,findproductbyid)
router.route('/ProductByBrand').get(AuthenticatedUser,findproductbybrandname)


module.exports=router