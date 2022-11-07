import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    heigth: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:20px 0px;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    color:${props => props.theme.bgColor};
    background-color :white;
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        transition: color 0.3s ease-in-out;
        display: flex;
        padding: 20px;
        align-itmes:center;
        span {
            transform: translateY(4px); 
        }
    }
    &:hover {
        a {
            color:${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-size: 48px;
`;
const Loading = styled.h1`
    color:${props => props.theme.textColor};
    font-size: 48px;
    text-align: center;
`;

const Img = styled.img`
    width:25px;
    heigth:25px;
    margin-right:10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,    
}

function Coins () {
    const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
    return <Container>
        <Header>
            <Title>코인</Title>
        </Header>
        <div>
            {isLoading 
            ? <Loading>Loading...</Loading>
            : <CoinList>
                {data?.slice(0,100).map(coin => <Coin key={coin.id}>
                    <Link to={{
                        pathname: `/${coin.id}`,
                        state: { name: coin.name },
                    }}>
                        <Img src= {`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt={coin.name}/>
                        <span>
                            {coin.name} &rarr;
                        </span>
                        </Link>
                    </Coin>)}
            </CoinList>
            }
        </div>
    </Container>
}

export default Coins;