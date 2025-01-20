const express=require('express')
const {shopItems,popularItems,toptrendingItems,MensItems,WomensItems,Sayaitems,Bonaanzaitems,Khaadiitems,jitems}=require('../Controller/ShopController')
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

module.exports=router