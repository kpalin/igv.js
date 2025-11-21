
const h1red = "rgb(255, 41, 135)";
const h2blue = "rgb(40, 118, 255)";


import { enableSziTileSource } from './szi-tile-source-v0.6.1.js';
enableSziTileSource(OpenSeadragon);


let opts = {
    id: "openseadragon1",
    //prefixUrl: "./node_modules/openseadragon/build/openseadragon/images/",
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    tileSources: "./tmp_corr.dzi.dzi",
    maxZoomPixelRatio: 1000.,
    minZoomImageRatio: 1.,
    imageSmoothingEnabled: false,
    showNavigator: true,
    panHorizontal: false,
    panVertical: false,
    showNavigationControl: false,

    gestureSettingsMouse: {
        clickToZoom: false,
        dragToPan: false,
        dblClickToZoom: false,
        pinchToZoom: false,
        scrollToZoom: false,
        zoomToRefPoint: true
    }
};
opts = {
    id: "openseadragon1",
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    tileSources: "./tmp_corr.dzi.dzi",
    maxZoomPixelRatio: 1000.,
    minZoomImageRatio: 1.,
    imageSmoothingEnabled: false,
    showNavigator: false,
}


opts = {
    id: "openseadragon1",
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    tileSources: "./tmp_corr_gray.dzi",
    maxZoomPixelRatio: 1000.,
    minZoomImageRatio: 1.,
    imageSmoothingEnabled: false,
    showNavigator: false,
    drawer: 'canvas',
    gestureSettingsMouse: {
        clickToZoom: false
    }
}

const seismic_cmap = [[0, 0, 76], [0, 0, 79], [0, 0, 82], [0, 0, 85], [0, 0, 88], [0, 0, 90], [0, 0, 93], [0, 0, 96], [0, 0, 99], [0, 0, 102], [0, 0, 104], [0, 0, 107], [0, 0, 110], [0, 0, 113], [0, 0, 116], [0, 0, 118], [0, 0, 121], [0, 0, 124], [0, 0, 127], [0, 0, 130], [0, 0, 132], [0, 0, 135], [0, 0, 138], [0, 0, 141], [0, 0, 144], [0, 0, 146], [0, 0, 149], [0, 0, 152], [0, 0, 155], [0, 0, 158], [0, 0, 160], [0, 0, 163], [0, 0, 166], [0, 0, 169], [0, 0, 172], [0, 0, 174], [0, 0, 177], [0, 0, 180], [0, 0, 183], [0, 0, 186], [0, 0, 188], [0, 0, 191], [0, 0, 194], [0, 0, 197], [0, 0, 200], [0, 0, 202], [0, 0, 205], [0, 0, 208], [0, 0, 211], [0, 0, 214], [0, 0, 216], [0, 0, 219], [0, 0, 222], [0, 0, 225], [0, 0, 228], [0, 0, 230], [0, 0, 233], [0, 0, 236], [0, 0, 239], [0, 0, 242], [0, 0, 244], [0, 0, 247], [0, 0, 250], [0, 0, 253], [1, 1, 255], [5, 5, 255], [9, 9, 255], [13, 13, 255], [17, 17, 255], [21, 21, 255], [25, 25, 255], [29, 29, 255], [33, 33, 255], [37, 37, 255], [41, 41, 255], [45, 45, 255], [49, 49, 255], [53, 53, 255], [57, 57, 255], [61, 61, 255], [65, 65, 255], [69, 69, 255], [73, 73, 255], [77, 77, 255], [81, 81, 255], [85, 85, 255], [89, 89, 255], [93, 93, 255], [97, 97, 255], [101, 101, 255], [105, 105, 255], [109, 109, 255], [113, 113, 255], [117, 117, 255], [121, 121, 255], [125, 125, 255], [129, 129, 255], [133, 133, 255], [137, 137, 255], [141, 141, 255], [145, 145, 255], [149, 149, 255], [153, 153, 255], [157, 157, 255], [161, 161, 255], [165, 165, 255], [169, 169, 255], [173, 173, 255], [177, 177, 255], [181, 181, 255], [185, 185, 255], [189, 189, 255], [193, 193, 255], [197, 197, 255], [201, 201, 255], [205, 205, 255], [209, 209, 255], [213, 213, 255], [217, 217, 255], [221, 221, 255], [225, 225, 255], [229, 229, 255], [233, 233, 255], [237, 237, 255], [241, 241, 255], [245, 245, 255], [249, 249, 255], [253, 253, 255], [255, 253, 253], [255, 249, 249], [255, 245, 245], [255, 241, 241], [255, 237, 237], [255, 233, 233], [255, 229, 229], [255, 225, 225], [255, 221, 221], [255, 217, 217], [255, 213, 213], [255, 209, 209], [255, 205, 205], [255, 201, 201], [255, 197, 197], [255, 193, 193], [255, 189, 189], [255, 185, 185], [255, 181, 181], [255, 177, 177], [255, 173, 173], [255, 169, 169], [255, 165, 165], [255, 161, 161], [255, 157, 157], [255, 153, 153], [255, 149, 149], [255, 145, 145], [255, 141, 141], [255, 137, 137], [255, 133, 133], [255, 129, 129], [255, 125, 125], [255, 121, 121], [255, 117, 117], [255, 113, 113], [255, 109, 109], [255, 105, 105], [255, 101, 101], [255, 97, 97], [255, 93, 93], [255, 89, 89], [255, 85, 85], [255, 81, 81], [255, 77, 77], [255, 73, 73], [255, 69, 69], [255, 65, 65], [255, 61, 61], [255, 57, 57], [255, 53, 53], [255, 49, 49], [255, 45, 45], [255, 41, 41], [255, 37, 37], [255, 33, 33], [255, 29, 29], [255, 25, 25], [255, 21, 21], [255, 17, 17], [255, 13, 13], [255, 9, 9], [255, 5, 5], [255, 1, 1], [254, 0, 0], [252, 0, 0], [250, 0, 0], [248, 0, 0], [246, 0, 0], [244, 0, 0], [242, 0, 0], [240, 0, 0], [238, 0, 0], [236, 0, 0], [234, 0, 0], [232, 0, 0], [230, 0, 0], [227, 0, 0], [226, 0, 0], [224, 0, 0], [222, 0, 0], [220, 0, 0], [218, 0, 0], [216, 0, 0], [214, 0, 0], [211, 0, 0], [210, 0, 0], [208, 0, 0], [206, 0, 0], [204, 0, 0], [202, 0, 0], [200, 0, 0], [198, 0, 0], [195, 0, 0], [194, 0, 0], [192, 0, 0], [190, 0, 0], [188, 0, 0], [186, 0, 0], [184, 0, 0], [182, 0, 0], [179, 0, 0], [178, 0, 0], [176, 0, 0], [174, 0, 0], [172, 0, 0], [170, 0, 0], [168, 0, 0], [166, 0, 0], [163, 0, 0], [162, 0, 0], [160, 0, 0], [158, 0, 0], [156, 0, 0], [154, 0, 0], [152, 0, 0], [150, 0, 0], [147, 0, 0], [146, 0, 0], [144, 0, 0], [142, 0, 0], [140, 0, 0], [138, 0, 0], [136, 0, 0], [134, 0, 0], [132, 0, 0], [130, 0, 0], [128, 0, 0]]
const cmap = seismic_cmap;

// const szi_regions = [
//     "chr10_28831833_28846834_gp5d1kx.ps27347867.szi",
//     "chr10_8691535_8706536_gp5d1kx.ps671941.szi",
//     "chr1_109825066_109840067_gp5d1kx.ps108478516.szi",
//     "chr1_172245680_172260681_gp5d1kx.ps171326927.szi",
//     "chr1_182438712_182453713_gp5d1kx.ps181652317.szi",
//     "chr1_201166535_201181536_gp5d1kx.ps200687307.szi",
//     "chr1_204451537_204466538_gp5d1kx.ps201678130.szi",
//     "chr1_21993063_22008064_gp5d1kx.ps20287018.szi",
//     "chr1_221104789_221119790_gp5d1kx.ps221051063.szi",
//     "chr1_22200574_22215575_gp5d1kx.ps20287018.szi",
//     "chr1_239649189_239664190_gp5d1kx.ps232187716.szi",
//     "chr1_244427274_244442275_gp5d1kx.ps232187716.szi",
//     "chr1_37855330_37870331_gp5d1kx.ps35760121.szi",
//     "chr1_54654902_54669903_gp5d1kx.ps54498843.szi",
//     "chr1_70445201_70460202_gp5d1kx.ps54978056.szi"];

const szi_regions = [
    "chr10_100405008_100420009_gp5d1kx.ps87603307.szi",
    "chr10_100459912_100474913_gp5d1kx.ps87603307.szi",
    "chr10_113404232_113419233_gp5d1kx.ps113077896.szi",
    "chr10_113850884_113865885_gp5d1kx.ps113509316.szi",
    "chr10_28831833_28846834_gp5d1kx.ps27347867.szi",
    "chr10_29027052_29042053_gp5d1kx.ps27347867.szi",
    "chr10_51727467_51742468_gp5d1kx.ps48424303.szi",
    "chr10_79921152_79936153_gp5d1kx.ps73211232.szi",
    "chr10_80150695_80165696_gp5d1kx.ps73211232.szi",
    "chr10_8691535_8706536_gp5d1kx.ps671941.szi",
    "chr10_90690867_90705868_gp5d1kx.ps87603307.szi",
    "chr1_109825066_109840067_gp5d1kx.ps108478516.szi",
    "chr11_100848083_100863084_gp5d1kx.ps94227953.szi",
    "chr11_101738883_101753884_gp5d1kx.ps94227953.szi",
    "chr11_10387120_10402121_gp5d1kx.ps2789474.szi",
    "chr11_111288794_111303795_gp5d1kx.ps94227953.szi",
    "chr11_118900114_118915115_gp5d1kx.ps94227953.szi",
    "chr11_61766625_61781626_gp5d1kx.ps61327543.szi",
    "chr11_70101873_70116874_gp5d1kx.ps62815939.szi",
    "chr1_172245680_172260681_gp5d1kx.ps171326927.szi",
    "chr11_74575418_74590419_gp5d1kx.ps62815939.szi",
    "chr11_74839713_74854714_gp5d1kx.ps62815939.szi",
    "chr1_182438712_182453713_gp5d1kx.ps181652317.szi",
    "chr1_201166535_201181536_gp5d1kx.ps200687307.szi",
    "chr1_204451537_204466538_gp5d1kx.ps201678130.szi",
    "chr12_111539381_111554382_gp5d1kx.ps98610008.szi",
    "chr12_114629878_114644879_gp5d1kx.ps98610008.szi",
    "chr12_115424752_115439753_gp5d1kx.ps98610008.szi",
    "chr12_115467815_115482816_gp5d1kx.ps98610008.szi",
    "chr1_21993063_22008064_gp5d1kx.ps20287018.szi",
    "chr1_221104789_221119790_gp5d1kx.ps221051063.szi",
    "chr1_22200574_22215575_gp5d1kx.ps20287018.szi",
    "chr12_31310901_31325902_gp5d1kx.ps31056981.szi",
    "chr1_239649189_239664190_gp5d1kx.ps232187716.szi",
    "chr12_4258440_4273441_gp5d1kx.ps1629.szi",
    "chr12_42687178_42702179_gp5d1kx.ps37167132.szi",
    "chr12_4278366_4305924_gp5d1kx.ps1629.szi",
    "chr1_244427274_244442275_gp5d1kx.ps232187716.szi",
    "chr12_50778765_50793766_gp5d1kx.ps50517579.szi",
    "chr12_57107400_57122401_gp5d1kx.ps56492367.szi",
    "chr12_6276705_6291706_gp5d1kx.ps1629.szi",
    "chr12_6298019_6313020_gp5d1kx.ps1629.szi",
    "chr12_63981948_63996949_gp5d1kx.ps58073318.szi",
    "chr12_71096555_71111556_gp5d1kx.ps66047588.szi",
    "chr12_95628774_95643775_gp5d1kx.ps92760839.szi",
    "chr13_108921539_108936540_gp5d1kx.ps17459512.szi",
    "chr13_109649433_109664434_gp5d1kx.ps17459512.szi",
    "chr13_26176543_26191544_gp5d1kx.ps17459512.szi",
    "chr13_32729217_32744218_gp5d1kx.ps17459512.szi",
    "chr13_36129208_36144209_gp5d1kx.ps17459512.szi",
    "chr13_72289031_72304032_gp5d1kx.ps17459512.szi",
    "chr13_72431951_72446952_gp5d1kx.ps17459512.szi",
    "chr13_72626973_72641974_gp5d1kx.ps17459512.szi",
    "chr13_77245040_77260041_gp5d1kx.ps17459512.szi",
    "chr1_37855330_37870331_gp5d1kx.ps35760121.szi",
    "chr14_45091879_45106880_gp5d1kx.ps43776481.szi",
    "chr14_46224480_46239481_gp5d1kx.ps43776481.szi",
    "chr14_48153113_48168114_gp5d1kx.ps43776481.szi",
    "chr14_48179150_48194151_gp5d1kx.ps43776481.szi",
    "chr14_52922261_52937262_gp5d1kx.ps49912196.szi",
    "chr14_52941336_52956337_gp5d1kx.ps49912196.szi",
    "chr14_93540686_93555687_gp5d1kx.ps85875563.szi",
    "chr15_30496632_30521400_gp5d1kx.ps30372452.szi",
    "chr15_30652971_30667972_gp5d1kx.ps30372452.szi",
    "chr1_54654902_54669903_gp5d1kx.ps54498843.szi",
    "chr15_64522063_64537064_gp5d1kx.ps62074736.szi",
    "chr15_64924890_64939891_gp5d1kx.ps64851098.szi",
    "chr15_65597720_65612721_gp5d1kx.ps64851098.szi",
    "chr15_70025656_70040657_gp5d1kx.ps64851098.szi",
    "chr15_88390574_88405575_gp5d1kx.ps86934976.szi",
    "chr16_74498746_74513747_gp5d1kx.ps73562788.szi",
    "chr16_86056472_86071473_gp5d1kx.ps84596381.szi",
    "chr16_92280818_92295819_gp5d1kx.ps91440566.szi",
    "chr16_92364948_92379949_gp5d1kx.ps91440566.szi",
    "chr16_92730908_92745909_gp5d1kx.ps91440566.szi",
    "chr1_70445201_70460202_gp5d1kx.ps54978056.szi",
    "chr17_10704332_10719333_gp5d1kx.ps10664233.szi",
    "chr17_73282676_73297677_gp5d1kx.ps73208878.szi",
    "chr17_784555_799556_gp5d1kx.ps2852.szi",
    "chr17_810124_825125_gp5d1kx.ps2852.szi",
    "chr17_84108544_84123545_gp5d1kx.ps84044264.szi",
    "chr18_3768857_3783858_gp5d1kx.ps196698.szi",
    "chr18_49113720_49128721_gp5d1kx.ps47201314.szi",
    "chr19_16433768_16448769_gp5d1kx.ps8847566.szi",
    "chr19_35540196_35555197_gp5d1kx.ps29744839.szi",
    "chr19_44167759_44182760_gp5d1kx.ps41715947.szi",
    "chr19_51702264_51717265_gp5d1kx.ps50933146.szi",
    "chr19_5820857_5835858_gp5d1kx.ps150988.szi",
    "chr19_61594767_61609768_gp5d1kx.ps53176657.szi",
    "chr20_36314981_36329982_gp5d1kx.ps32735269.szi",
    "chr20_45629849_45644850_gp5d1kx.ps37730536.szi",
    "chr20_45757092_45772093_gp5d1kx.ps37730536.szi",
    "chr20_50485943_50500944_gp5d1kx.ps50483738.szi",
    "chr20_52132149_52147150_gp5d1kx.ps50560052.szi",
    "chr20_52205736_52220737_gp5d1kx.ps50560052.szi",
    "chr20_52401873_52416874_gp5d1kx.ps50560052.szi",
    "chr20_59026383_59041384_gp5d1kx.ps57445250.szi",
    "chr20_64145515_64160516_gp5d1kx.ps57445250.szi",
    "chr20_6429503_6444504_gp5d1kx.ps941711.szi",
    "chr20_65483707_65498708_gp5d1kx.ps57445250.szi",
    "chr20_6656593_6671594_gp5d1kx.ps941711.szi",
    "chr20_6752636_6767637_gp5d1kx.ps941711.szi",
    "chr20_6815272_6830273_gp5d1kx.ps941711.szi",
    "chr20_7865924_7880925_gp5d1kx.ps941711.szi",
    "chr2_136082940_136097941_gp5d1kx.ps131031250.szi",
    "chr21_44730417_44745418_gp5d1kx.ps41909246.szi",
    "chr2_159560342_159575343_gp5d1kx.ps157663868.szi",
    "chr2_168618914_168633915_gp5d1kx.ps157663868.szi",
    "chr2_199182305_199197306_gp5d1kx.ps196963315.szi",
    "chr2_199500337_199515338_gp5d1kx.ps196963315.szi",
    "chr2_218804785_218819786_gp5d1kx.ps216828390.szi",
    "chr22_29463881_29478882_gp5d1kx.ps24456364.szi",
    "chr22_39711418_39726419_gp5d1kx.ps24456364.szi",
    "chr22_43767071_43782072_gp5d1kx.ps43139434.szi",
    "chr22_43856016_43871017_gp5d1kx.ps43139434.szi",
    "chr22_45826749_45841750_gp5d1kx.ps43139434.szi",
    "chr22_46445421_46460422_gp5d1kx.ps43139434.szi",
    "chr2_98109612_98124613_gp5d1kx.ps97957255.szi",
    "chr3_115898535_115926569_gp5d1kx.ps96399111.szi",
    "chr3_115994280_116009281_gp5d1kx.ps96399111.szi",
    "chr3_136719932_136734933_gp5d1kx.ps132832226.szi",
    "chr3_136767583_136782584_gp5d1kx.ps132832226.szi",
    "chr3_172551038_172566039_gp5d1kx.ps158205279.szi",
    "chr3_40881276_40896277_gp5d1kx.ps36822910.szi",
    "chr3_52872224_52887225_gp5d1kx.ps50643417.szi",
    "chr3_53063168_53078169_gp5d1kx.ps50643417.szi",
    "chr3_64302824_64317825_gp5d1kx.ps60898237.szi",
    "chr3_64674908_64689909_gp5d1kx.ps60898237.szi",
    "chr3_66430975_66445976_gp5d1kx.ps60898237.szi",
    "chr4_108513460_108528461_gp5d1kx.ps94597921.szi",
    "chr4_148047809_148062810_gp5d1kx.ps146357336.szi",
    "chr4_153896402_153911403_gp5d1kx.ps153517618.szi",
    "chr4_177831580_177846581_gp5d1kx.ps156910318.szi",
    "chr4_97324698_97339699_gp5d1kx.ps94597921.szi",
    "chr5_1140290_1155291_gp5d1kx.ps1177.szi",
    "chr5_1196681_1211682_gp5d1kx.ps1177.szi",
    "chr5_135682962_135697963_gp5d1kx.ps135239031.szi",
    "chr5_150695967_150710968_gp5d1kx.ps143283876.szi",
    "chr5_173430234_173445235_gp5d1kx.ps143283876.szi",
    "chr5_40339532_40354533_gp5d1kx.ps36303427.szi",
    "chr5_40530901_40545902_gp5d1kx.ps36303427.szi",
    "chr5_84066687_84081688_gp5d1kx.ps75868302.szi",
    "chr6_106687352_106702353_gp5d1kx.ps105666911.szi",
    "chr6_107203114_107218115_gp5d1kx.ps105666911.szi",
    "chr6_118664608_118679609_gp5d1kx.ps109691261.szi",
    "chr6_12153420_12168421_gp5d1kx.ps12096323.szi",
    "chr6_134854144_134869145_gp5d1kx.ps109691261.szi",
    "chr6_28762133_28777134_gp5d1kx.ps27407565.szi",
    "chr6_30902730_30917731_gp5d1kx.ps30892020.szi",
    "chr6_30955125_30970126_gp5d1kx.ps30892020.szi",
    "chr6_31197975_31212976_gp5d1kx.ps31031708.szi",
    "chr6_31304939_31319940_gp5d1kx.ps31314258.szi",
    "chr6_32440794_32455795_gp5d1kx.ps32346680.szi",
    "chr6_35417359_35432360_gp5d1kx.ps35143864.szi",
    "chr6_36468750_36483751_gp5d1kx.ps36268703.szi",
    "chr6_45431646_45446647_gp5d1kx.ps43282769.szi",
    "chr6_55544558_55559559_gp5d1kx.ps43282769.szi",
    "chr6_55679445_55703618_gp5d1kx.ps43282769.szi",
    "chr6_6611294_6626295_gp5d1kx.ps6543648.szi",
    "chr6_7093736_7108737_gp5d1kx.ps7033145.szi",
    "chr7_101111804_101126805_gp5d1kx.ps100945640.szi",
    "chr7_132226001_132241002_gp5d1kx.ps118815913.szi",
    "chr7_2929729_2944730_gp5d1kx.ps2889.szi",
    "chr7_45264035_45279036_gp5d1kx.ps44850263.szi",
    "chr7_46208706_46223707_gp5d1kx.ps44850263.szi",
    "chr7_47003714_47018715_gp5d1kx.ps44850263.szi",
    "chr7_47625502_47640503_gp5d1kx.ps44850263.szi",
    "chr7_74946307_74961308_gp5d1kx.ps74449007.szi",
    "chr8_117731667_117753247_gp5d1kx.ps112193610.szi",
    "chr8_117899300_117914301_gp5d1kx.ps112193610.szi",
    "chr8_128521098_128537686_gp5d1kx.ps124607544.szi",
    "chr8_128689260_128704261_gp5d1kx.ps124607544.szi",
    "chr8_24074570_24089571_gp5d1kx.ps12878830.szi",
    "chr8_59243794_59258795_gp5d1kx.ps46304026.szi",
    "chr9_111081669_111096670_gp5d1kx.ps106219211.szi",
    "chr9_119775829_119790830_gp5d1kx.ps106219211.szi",
    "chr9_123056520_123071521_gp5d1kx.ps121366067.szi",
    "chr9_146025819_146040820_gp5d1kx.ps145999405.szi",
    "chr9_146268977_146283978_gp5d1kx.ps146090923.szi",
    "chr9_22112717_22127718_gp5d1kx.ps1878.szi",
    "chr9_34118572_34133573_gp5d1kx.ps1878.szi",
    "chrX_9370897_9385898_gp5d1kx.ps1308022.szi"
];


//const sziUrl = './data/shroom4_mA_1kx_gp5d.ps1308022.chrX_9367002-9387992.szi';

//const tileSource = await OpenSeadragon.SziTileSource.createSziTileSource(sziUrl);

const dziViewer = new OpenSeadragon.Viewer({
    id: "openseadragon1",
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    maxZoomPixelRatio: 1000.,
    minZoomImageRatio: 1.,
    imageSmoothingEnabled: false,
    showNavigator: false,
    drawer: 'canvas',
    gestureSettingsMouse: {
        clickToZoom: false
    },
    //tileSources: [tileSource],
});


function maybeLoadImagesForChrom(chrom) {
    if (dziViewer._cur_chrom == chrom) {
        return;
    } else {
        dziViewer._cur_chrom = chrom;
        // Clear existing images
        dziViewer.world.removeAll();
        // Load new images for the specified chromosome
        szi_regions.filter(s => {
            return s.startsWith(chrom + "_");
        }).forEach(r => {
            OpenSeadragon.SziTileSource.createSziTileSource("https://a3s.fi/251114_deepfiber/web/data/" + r).then(async src => {
                let m = r.match(/(chr[^_-]+)[:_-](\d+)/);
                src.fig_chr = m[1];
                src.fig_start_bp = parseInt(m[2]);
                console.log("Adding SZI tile source: ", src, " at ", src.fig_chr, ":", src.fig_start_bp);
                dziViewer.addTiledImage({ tileSource: src, x: src.fig_start_bp, y: src.fig_start_bp, width: src.dimensions.x });
            });
        });
    }

}
// szi_regions.forEach(r => {

//     OpenSeadragon.SziTileSource.createSziTileSource("https://a3s.fi/251114_deepfiber/web/data/" + r).then(async src => {
//         let m = r.match(/(chr[^_-]+)[:_-](\d+)/);
//         src.fig_chr = m[1];
//         src.fig_start_bp = parseInt(m[2]);
//         console.log("Adding SZI tile source: ", src, " at ", src.fig_chr, ":", src.fig_start_bp);
//         dziViewer.addTiledImage({ tileSource: src, x: src.fig_start_bp, y: src.fig_start_bp ,width:src.dimensions.x });
//     });
// });


//var dziViewer = OpenSeadragon(opts);
//dziViewer.fig_start_bp = 9367002;
//dziViewer.fig_chr = "chrX";

const x_coord = document.getElementById('X_coord');
const y_coord = document.getElementById('Y_coord');



function nearestColorIndex(color) {
    let min_i = cmap.length;
    let min_d = Infinity;
    for (let i = 0; i < cmap.length; i++) {
        let c = cmap[i];
        let d = (color[0] - c[0]) ** 2 + (color[1] - c[1]) ** 2 + (color[2] - c[2]) ** 2;
        if (d < min_d) {
            min_d = d;
            min_i = i;
        }
    }
    return min_i;
}
if (true) {
    dziViewer.setFilterOptions({
        filters: {
            processors: OpenSeadragon.Filters.COLORMAP(cmap, 127)
        }
    });

}


function fitRegion(xstart, xend, ystart, yend) {
    // Define a rectangle in image coordinates (x, y, width, height in pixels)

    const w = xend - xstart + 1;
    const h = yend - ystart + 1;
    const imageRect = new OpenSeadragon.Rect(xstart, xstart, w, h);
    console.log("imageRect: ", imageRect);

    // Convert to viewport coordinates
    var viewportRect = dziViewer.viewport.imageToViewportRectangle(imageRect);
    console.log("viewportRect: ", viewportRect);
    // Fit that region into the viewport
    dziViewer.viewport.fitBounds(viewportRect, true); // true = immediate, false = animated
}

function viewportToGenomicCoordinates(viewportPoint) {

    // Find which image was clicked
    const count = dziViewer.world.getItemCount();
    console.log(`Count is ${count} viewportToGenomicCoordinates`);
    var x_pos_bp = -1;
    var y_pos_bp = -1;
    var genomic_chr = "";
    for (let i = 0; i < count; i++) {
        const tiledImage = dziViewer.world.getItemAt(i);

        // Check if click is within this image's bounds
        const imageBounds = tiledImage.getBounds();
        console.log("alt x_pos:", imageBounds.x + tiledImage.viewportToImageCoordinates(viewportPoint).x);
        if (imageBounds.containsPoint(viewportPoint) || (genomic_chr === "")) {
            const imagePoint = tiledImage.viewportToImageCoordinates(viewportPoint);

            x_pos_bp = Math.round(imageBounds.x + imagePoint.x);
            y_pos_bp = Math.round(imageBounds.y + imagePoint.y);
            genomic_chr = tiledImage.source.fig_chr;
            break;
        }
    }
    return {
        chr: genomic_chr,
        x_bp: x_pos_bp,
        y_bp: y_pos_bp
    };
}

dziViewer.addHandler('canvas-click', function (event) {
    //    return; // disable for now

    // The canvas-click event gives us a position in web coordinates.
    var webPoint = event.position;

    // Convert that to viewport coordinates, the lingua franca of OpenSeadragon coordinates.
    var viewportPoint = dziViewer.viewport.pointFromPixel(webPoint);

    // Find which image was clicked
    const count = dziViewer.world.getItemCount();
    console.log(`Count is ${count}`);
    var x_pos_bp = -1;
    var y_pos_bp = -1;
    var genomic_chr = "";
    for (let i = 0; i < count; i++) {
        const tiledImage = dziViewer.world.getItemAt(i);

        // Check if click is within this image's bounds
        const imageBounds = tiledImage.getBounds();
        if (imageBounds.containsPoint(viewportPoint)) {
            const imagePoint = tiledImage.viewportToImageCoordinates(viewportPoint);
            console.log("webPoint: ", webPoint.toString(), " imagePoint:", imagePoint.toString());
            console.log(tiledImage);
            console.log(imageBounds);
            console.log('Clicked on image', i, 'at coords:', imagePoint.x, imagePoint.y, imageBounds.containsPoint(viewportPoint));
            x_pos_bp = Math.round(imageBounds.x + imagePoint.x);
            y_pos_bp = Math.round(imageBounds.y + imagePoint.y);
            genomic_chr = tiledImage.source.fig_chr;
            //break;
        }
    }

    // The canvas-click event gives us a position in web coordinates.
    var color = dziViewer.getPixelColor(webPoint);

    console.log("Pixel color RGBA: ", color);


    let color_i = nearestColorIndex(color);
    let rho = color_i / (cmap.length - 1) * 2 - 1.0;
    document.getElementById('click-position').innerHTML = `idx: ${color_i}  approx rho: ${rho.toFixed(2)} X: ${genomic_chr}:${x_pos_bp.toLocaleString()} Y: ${genomic_chr}:${y_pos_bp.toLocaleString()}`;
    //console.log(`Pixel color RGBA: (${red}, ${green}, ${blue}, ${alpha})`);
});

let update_igv_from_dzi = true;

dziViewer.addHandler('animation-finish', function (event) {
    //return; // disable for now
    var bounds = event.eventSource.viewport.getBounds(false);
    var topLeft = viewportToGenomicCoordinates(bounds.getTopLeft());
    var bottomRight = viewportToGenomicCoordinates(bounds.getBottomRight());
    console.log(`Viewport bounds in image coordinates: ${topLeft.x} ${topLeft.y} ${bottomRight.x} ${bottomRight.y}`);
    console.log(`Viewport bounds in image coordinates: TopLeft ${topLeft.toString()}, BottomRight ${bottomRight.toString()}`);

    const x_start_bp = Math.floor(topLeft.x_bp);
    const x_end_bp = Math.ceil(bottomRight.x_bp);
    const y_start_bp = Math.floor(topLeft.y_bp);
    const y_end_bp = Math.ceil(bottomRight.y_bp);
    const event_chrom = topLeft.chr;
    console.assert(topLeft.chr === bottomRight.chr, "Both corners should be on the same chromosome");


    const x_region_str = `${event_chrom}:${x_start_bp}-${x_end_bp}`;
    const y_region_str = `${event_chrom}:${y_start_bp}-${y_end_bp}`;
    console.log(`X (hap 1) region: ${x_region_str} Y (hap 2) region: ${y_region_str}`);
    x_coord.innerHTML = `X h1: ${event_chrom}:${x_start_bp.toLocaleString()}-${x_end_bp.toLocaleString()}  (${(x_end_bp - x_start_bp + 1).toLocaleString()} bp)`;
    y_coord.innerHTML = `Y h2: ${event_chrom}:${y_start_bp.toLocaleString()}-${y_end_bp.toLocaleString()}  (${(y_end_bp - y_start_bp + 1).toLocaleString()} bp)`;

    // Now, update IGV to reflect this region
    if (window.igvBrowser && update_igv_from_dzi) {
        const locusStr = x_region_str + " " + y_region_str;
        //let locusStr = "MYC CCAT2"
        console.log(`Updating IGV locus to ${locusStr}`);

        window.igvBrowser.clearROIs();
        const dynamic_roi_config =
            [
                {
                    color: "rgba(237,72,155,0.0)",
                    features:
                        [
                            {
                                chr: event_chrom,
                                start: x_start_bp,
                                end: x_end_bp
                            },
                            {
                                chr: event_chrom,
                                start: y_start_bp,
                                end: y_end_bp
                            }
                        ]
                }
            ];
        window.igvBrowser.loadROI(dynamic_roi_config);


        window.igvBrowser.search(locusStr).then(() => {
            console.log("IGV locus updated");
        }).catch((error) => {
            console.error("Error updating IGV locus:", error);
        });
    } else {
        console.log("IGV browser not yet initialized");
    }
    update_igv_from_dzi = true;
});

// Draw colorbar
function drawColorbar(canvas, colormap) {
    const ctx = canvas.getContext('2d');
    //console.log(`colormap length  ${colormap.length}`);
    for (let x = 0; x < canvas.width; x++) {
        const index = Math.floor((x / canvas.width) * colormap.length);
        const color = colormap[index];

        ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        //console.log(`${index} ${color} ctx.fillStyle=${ctx.fillStyle}`);
        ctx.fillRect(x, 0, 1, canvas.height);
    }
}

drawColorbar(document.getElementById('colorbar'), cmap);
import igv from "https://cdn.jsdelivr.net/npm/igv@3.3.0/dist/igv.esm.min.js"
//import igv from "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/web_dev/igv.esm.min.js"




//import igv from "/js/index.js"
const options = {
    "genome": "hs1",
    "locus": "chr1:37855330-37870331",
    "tracks": [


        {
            "type": "wig",
            "format": "bigwig",
            "min": 0,
            "autoscale": true,
            "graphType": "bar",
            "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.assoc.fdr.bw",
            "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.assoc.fdr",
            "height": 100
        },
        {
            "type": "annotation",
            "format": "bed",
            "url": "https://a3s.fi/251114_deepfiber/web/annot/CRC_GWAS.Fernandez.GCST90129505.chm13v2.bed.gz",
            "indexURL": "https://a3s.fi/251114_deepfiber/web/annot/CRC_GWAS.Fernandez.GCST90129505.chm13v2.bed.gz.tbi",
            "name": "CRC Associations (Fernandez et al., GCST90129505)",
        },
        {
            type: "variant",
            format: "vcf",
            url: "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-12-multiSMRT-merged/snv/longshot/GP5d-psfHia5-BIDGEN-SZ-2399-merged.longshot.snv.vcf.gz",
            indexURL: "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-12-multiSMRT-merged/snv/longshot/GP5d-psfHia5-BIDGEN-SZ-2399-merged.longshot.snv.vcf.gz.tbi",
            name: "Gp5d Single Nucleotide Variants"

        },
        {
            "name": "FibreSeq 6mA, (h1:red, h2:blue)",
            "type": "merged",
            "autoscale": false,
            "alpha": 0.5,
            "height": 100,

            "min": 0,
            "max": 100,
            "tracks": [
                {
                    "type": "wig",
                    "format": "bigwig",
                    "min": 0,
                    "max": 100,
                    "graphType": "bar",
                    "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.A+a.0.h1.bw",
                    "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.A+a.0.h1",
                    "height": 100,
                    "color": h1red
                },
                {
                    "type": "wig",
                    "format": "bigwig",
                    "min": 0,
                    "max": 100,
                    "graphType": "bar",
                    "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.A+a.0.h2.bw",
                    "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.A+a.0.h2",
                    "height": 100,
                    "color": h2blue
                }
            ]

        }
        ,
        {
            "name": "DNA methyaltion 5mCpG, (h1:red, h2:blue)",
            "type": "merged",
            "autoscale": false,
            "alpha": 0.5,
            "height": 100,

            "min": 0,
            "max": 100,
            "tracks": [


                // {
                //     "type": "wig",
                //     "format": "bigwig",
                //     "min": 0,
                //     "max": 100,
                //     "graphType": "line",
                //     "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.all.bw",
                //     "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.all",
                //     "height": 100
                // },
                {
                    "type": "wig",
                    "format": "bigwig",
                    "min": 0,
                    "max": 100,
                    "graphType": "line",
                    "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.h1.bw",
                    "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.h1",
                    "height": 100,
                    "color": h1red
                },
                {
                    "type": "wig",
                    "format": "bigwig",
                    "min": 0,
                    "max": 100,
                    "graphType": "line",
                    "url": "https://a3s.fi/250619_BIDGEN-SZ-2399_GP5d-psfHia5-1kx/epigenome/cram/methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.h2.bw",
                    "name": "methylation_frequency.GP5d-psfHia5-1kx-BIDGEN-SZ-2399.cram.longshot.phased.raw.CG+m.0.h2",
                    "height": 100,
                    "color": h2blue
                }]
        },
        {
            "type": "wig",
            "format": "bigwig",
            "graphType": "dynseq",
            "autoscale": true,
            "url": "https://a3s.fi/phyloP/phyloP470way_hs1.bw",
            "name": "PhyloP, Hillar lab 470 mammals",
            "height": 100

        },
        {
            "type": "annotation",
            "format": "bed",
            "url": "https://a3s.fi/phyloP/MOODS_matches_representatives_hs1.bed.gz",
            "indexURL": "https://a3s.fi/phyloP/MOODS_matches_representatives_hs1.bed.gz.tbi",
            "name": "MOODS matches representative"
            //"height": 10

        }
    ]
}

function genomicToViewportRectangle(chrom, x_bp, y_bp, x_width, y_width) {

    // Find which image was clicked
    const count = dziViewer.world.getItemCount();
    console.log(`Count is ${count}`);


    const imageRect = new OpenSeadragon.Rect(x_bp, y_bp, x_width, y_width);

    return {
        chr: chrom,
        viewport_rect: imageRect
    };

}
function fitImageRect(imgChr, imgX, imgY, widthPx, heightPx, immediately = false) {
    //const vpRect = dziViewer.viewport.imageToViewportRectangle(imgX , imgY, widthPx, heightPx);
    maybeLoadImagesForChrom(imgChr);
    const vpRect = genomicToViewportRectangle(imgChr, imgX, imgY, widthPx, heightPx).viewport_rect;
    update_igv_from_dzi = false;
    console.log("vpRect: ", vpRect);
    if (vpRect) {
        dziViewer.viewport.fitBounds(vpRect, immediately); // zoom + pan so the rect fills the viewer
    }
}

var igvDiv = document.getElementById("igvDiv")



igv.createBrowser(igvDiv, options)
    .then(function (browser) {
        console.log("Created IGV browser")
        console.log("Loaded tracks:", options.tracks.length)


        function update_dzi_view() {
            // your logic here
            console.log('2D view updated');

            let loci = browser.currentLoci();
            console.log(loci);
            if (typeof loci === 'string' || loci instanceof String) {
                console.log("Please select exactly two loci to define the 2D region.");
                const m_x = loci.trim().match(/^([A-Za-z0-9._-]+):(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)(?:-(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?))?$/);
                console.log(m_x);
                fitImageRect(m_x[1], parseInt(m_x[2]), parseInt(m_x[2]), m_x[3] - m_x[2], m_x[3] - m_x[2], false);
            } else if (loci.length == 2) {
                console.log(loci);
                const m_x = loci[0].trim().match(/^([A-Za-z0-9._-]+):(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)-(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)$/);
                const m_y = loci[1].trim().match(/^([A-Za-z0-9._-]+):(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)-(\d{1,3}(?:,\d{3})*|\d+(?:[.]\d+)?)$/);
                if (!m_x || !m_y) {
                    console.log("Loci must be in the format chr:start-end");
                    return;
                }
                fitImageRect(m_x[1], parseInt(m_x[2]), parseInt(m_y[2]), m_x[3] - m_x[2], m_y[3] - m_y[2], false);
            }

        }






        const target = document.getElementById('openseadragon1');

        function setWidth() {
            const refs = browser.root.querySelectorAll('.igv-column');

            const rect = refs[0].getBoundingClientRect();
            const igv_rect = browser.root.getBoundingClientRect();

            console.log(refs);
            console.log(rect)
            console.log(`Setting DZI x to ${rect.x} width to ${rect.width}px`);
            if (rect.width > 1) {
                target.style.width = Math.round(rect.width) + 'px';
                target.style.height = target.style.width;
                target.style.left = Math.round(rect.x - igv_rect.x) + 'px';

            }
        }


        setWidth();

        document.getElementById('setPairButton')
            .addEventListener('click', update_dzi_view);
        update_dzi_view();
        document.getElementById('reset2dButton')
            .addEventListener('click', (event) => { dziViewer.world.resetItems(); dziViewer.world.draw();});

        //console.log(ref);
        // keep it synced on layout changes
        const ro = new ResizeObserver(setWidth);
        ro.observe(browser.root);

        window.igvBrowser = browser
    })
    .catch(function (error) {
        console.error("Error creating IGV browser:", error)
        igvDiv.innerHTML = "<p style='color: red; text-align: center;'>Error loading IGV browser. Please check the console for details.</p>"
    })
