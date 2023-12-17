import React, {useState, useEffect} from 'react';
import {Image, Button, Icon} from "semantic-ui-react";
import {map, forEach} from "lodash";
import {useParams, useNavigate  } from "react-router-dom";
import {removeProductCart, cleanProductCart} from "../../../api/cart";
import {useOrder, useTable} from "../../../hooks";
import "./ListProductCart.scss";

export function ListProductCart(props) {
    const {products, onReloadCart} = props;
    const [total, setTotal] = useState(0);
    const {addOrderToTable} = useOrder();
    const {getTableByNumber} = useTable();
    const {tableNumber} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Recalcula el total cuando los productos cambian
        let totalTemp = 0;
        forEach(products, (product) =>{
            totalTemp += Number(product.price);
        });
        setTotal(totalTemp.toFixed(2));
      }, [products]);

    const removeProduct = (index) =>{
        removeProductCart(index);
        onReloadCart();
    };

    const createOrder = async () =>{
        const tableData = await getTableByNumber(tableNumber);
        const idTable = tableData[0].id;
        for await (const product of products){
            await addOrderToTable(idTable, product.id);
        }
        cleanProductCart();
        navigate(`/client/${tableNumber}/orders`);
    };



  return (
    <div className="list-product-cart">
        {map (products, (product, index) => (
            <div key={index} className="list-product-cart__product">
                <div>
                    <Image src={product.image} avatar/>
                    <span>{product.title}</span>
                </div>
                <span>S/{product.price}</span>
                <Icon name="close" onClick={()=> removeProduct(index)}/>
            </div>
        ))}

        <Button primary fluid onClick={createOrder}>
            Realizar Pedido (S/{total})
        </Button>
    </div>
  );
}
