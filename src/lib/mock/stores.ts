import type { Store } from "@/lib/types";

export const mockStores: Store[] = [
  {
    id: "store_1",
    name: "千歳駅前整体院",
    industry: "整体・整骨院",
    address: "北海道千歳市幸町1丁目3-2 千歳駅前ビル2F",
    phone: "0123-22-1234",
    googleProfileUrl: "https://maps.google.com/example-chitose-ekimae",
    reviewCount: 128,
    averageRating: 4.7,
    replyTone: "丁寧",
    features:
      "駅徒歩1分の整体院。肩こり・腰痛の根本改善を得意とし、国家資格保有スタッフが施術します。",
    ngWords: ["完治", "必ず治る", "絶対"],
    googleConnected: true,
  },
  {
    id: "store_2",
    name: "千歳整体サロン",
    industry: "整体・整骨院",
    address: "北海道千歳市清水町2丁目5-10 清水町ビル1F",
    reviewCount: 86,
    averageRating: 4.3,
    replyTone: "親しみやすい",
    features: "女性スタッフ中心の整体サロン。骨盤矯正メニューが人気です。",
    ngWords: [],
    googleConnected: false,
  },
  {
    id: "store_3",
    name: "札幌中央整体院",
    industry: "整体・整骨院",
    address: "北海道札幌市中央区南2条西3丁目11-1 札幌K23ビル4F",
    reviewCount: 203,
    averageRating: 4.6,
    replyTone: "丁寧",
    features: "札幌中心部の大型整体院。スポーツ整体・産後ケアにも対応。",
    ngWords: [],
    googleConnected: false,
  },
];

export const currentStore = mockStores[0];
