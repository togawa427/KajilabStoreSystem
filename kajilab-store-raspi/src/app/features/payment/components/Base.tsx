"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react"
import * as Payment from "@/app/features/payment/components/Index"
import { Product } from "@/types/json";
import Link from "next/link";
import { getProductByBarcode } from "@/api";
import { useSearchParams } from 'next/navigation';
import { BuyProduct } from '../type';
import { updateTotalPrice } from '../utils';
import { updateAddedProductList } from '@/utils/product';

const Base = () => {
  const [buyProducts, setBuyProducts] = useState<Array<BuyProduct>>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleScanBarcode = async (barcode: number) => {
    const buyProduct = await getProductByBarcode(Number(barcode))
    console.log("商品追加！!!")
    console.log(buyProduct)
    console.log("バーコード：")
    console.log(Number(barcode))
    updateAddedProductList(buyProduct, 1, buyProducts, setBuyProducts)
  }

  // ページ遷移時はパラムデータを使う
  const searchParams = useSearchParams();
  useEffect(() => {
    const paramBarcode = searchParams.get("barcode")
    handleScanBarcode(Number(paramBarcode))
  },[])

  // デバッグ用
  const showBuyProducts = () => {
    console.log(buyProducts)
  }

  useEffect(() => {
    updateTotalPrice(buyProducts, setTotalPrice)
  }, [buyProducts])

  return (
    <div>
      <Payment.InputBarcode handleScanBarcode={handleScanBarcode}/>
      <div className="mt-2">
          <Link href={"/"}>
          <Button variant="light" color="gray">
              <IconChevronsLeft/><div className="text-xl">キャンセル</div>
          </Button>
          </Link>
      </div>
      <div className="mt-2">
          <Payment.PaymentProductsList
            buyProducts={buyProducts}
            setCartProducts={setBuyProducts}
          />
      </div>
      <div className="mt-2 flex flex-row-reverse">
          <Payment.TotalPricePanel totalPrice={totalPrice}/>
          <Payment.PrepaidButton/>
          <Payment.CashButton/>
      </div>
      <Button onClick={showBuyProducts}>購入リスト</Button>
    </div>
  )
}

export default Base