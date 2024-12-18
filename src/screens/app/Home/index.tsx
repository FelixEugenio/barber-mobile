import React, { useState, useEffect } from 'react';
import { FlatList, View , StyleSheet } from 'react-native';
import { SafeAreaView  } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import { categories } from '../../../data/categories';
import { products } from '../../../data/product';
import CategoryBox from '../../../components/CategoryBox';
import ProductHomeItem from '../../../components/ProductHomeItem';

type    Props = {
    item: any
    index: number
    toLowerCase: () => void
};
const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [keyword, setKeyword] = useState<string>();
    const [filteredProducts, setFilteredProducts] = useState(products);

    console.log(keyword)

    useEffect(() => {
        if (selectedCategory && !keyword) {
            const updatedProducts = products.filter((product) => product?.category === selectedCategory);
            setFilteredProducts(updatedProducts);
        } else if (selectedCategory && keyword) {
            const updatedProducts = products.filter((product) => product?.category === selectedCategory && product?.title?.toLowerCase().includes(keyword?.toLowerCase()) );
            setFilteredProducts(updatedProducts); 
        } else if (!selectedCategory && keyword) {
            const updatedProducts = products.filter((product) => product?.title?.toLowerCase().includes(keyword?.toLowerCase()) );
            setFilteredProducts(updatedProducts); 
        } else if (!keyword && !selectedCategory) {
            setFilteredProducts(products);
        }
    }, [selectedCategory, keyword])

    const renderCategoryItem = ({ item, index }: Props) => {
        return (
            <CategoryBox
                onPress={() => setSelectedCategory(item?.id)}
                isSelected={item?.id === selectedCategory}
                isFirst={index === 0} 
                title={item?.title} 
                image={item?.image} 
            />
        )
    }

    const renderProductItem = ({ item }: any) => {
        return (
            <ProductHomeItem {...item} />
        )
    }

    return (
        <SafeAreaView>
            <Header showSearch onSearch={setKeyword} keyword={keyword} title="Find All You Need" />
            
            <FlatList 
                showsHorizontalScrollIndicator={false} 
                style={styles.list} 
                horizontal 
                data={categories} 
                renderItem={renderCategoryItem} 
                keyExtractor={(item, index) => String(index)} 
            />

            <FlatList
                style={styles.productsList}
                numColumns={2}
                data={filteredProducts} 
                renderItem={renderProductItem}
                keyExtractor={(item) => String(item.id)} 
                ListFooterComponent={<View style={{ height: 200 }} />}
            />
        </SafeAreaView>
    )
}

export default React.memo(Home);

export const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    list: {
        paddingVertical: 24,
        marginTop: 16,
    },
    productsList: {
        paddingHorizontal: 16,
    }
})