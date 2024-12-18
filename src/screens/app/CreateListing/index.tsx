import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '../../../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import { launchImageLibrary, Asset } from 'react-native-image-picker'; // Importando a tipagem Asset
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { categories } from '../../../data/categories';
import { propStack } from '../../../utils';
import { useNavigation } from '@react-navigation/native';

interface ListingValues {
  title: string;
  category: string;
  price: string;
  description: string;
}

const CreateListing = () => {
  const navigation = useNavigation<propStack>();
  
  // Tipagem para images, que pode ser um array de Asset (imagens)
  const [images, setImages] = useState<Asset[]>([]); 
  const [values, setValues] = useState<ListingValues>({
    title: '',
    category: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState<boolean>(false);

  const goBack = () => {
    navigation.goBack();
  };

  const uploadNewImage = async () => {
    setLoading(true);
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 5,});

    if (result?.assets?.length) {
      setImages((list) => [...list, ...result.assets]);
      setLoading(false);
    }
  };

  const onDeleteImage = (image: Asset) => {
    setImages((list) => {
      const filteredImages = list.filter((img) => img?.fileName !== image?.fileName);
      return filteredImages;
    });
  };

  const onChange = (value: string, key: keyof ListingValues) => {
    setValues((val) => ({ ...val, [key]: value }));
  };

  return (
    <SafeAreaView>
      <Header showBack={true} onBackPress={goBack} title="Create a new listing" />

      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.sectionTitle}>Upload Photos</Text>

          <View style={styles.imageRow}>
            <TouchableOpacity disabled={loading} style={styles.uploadContainer} onPress={uploadNewImage}>
              <View style={styles.uploadCircle}>
                <Text style={styles.uploadPlus}>+</Text>
              </View>
            </TouchableOpacity>

            {images?.map((image) => (
              <View style={styles.imageCont} key={image?.fileName}>
                <Image style={styles.image} source={{ uri: image?.uri }} />
                <Pressable hitSlop={20} onPress={() => onDeleteImage(image)}>
                  <Image style={styles.delete} source={require('../../../assets/close.png')} />
                </Pressable>
              </View>
            ))}

            {loading && <ActivityIndicator />}
          </View>

          <Input placeholder="Listing Title" label="Title" value={values.title} onChangeText={(v) => onChange(v, 'title')} />
          <Input placeholder="Select the category" label="Category" value={values.category} onChangeText={(v) => onChange(v, 'category')} type="picker" options={categories} />
          <Input placeholder="Enter price in USD" label="Price" value={values.price} onChangeText={(v) => onChange(v, 'price')} keyboardType="numeric" />
          <Input style={styles.textarea} placeholder="Tell us more..." label="Description" value={values.description} onChangeText={(v) => onChange(v, 'description')} multiline />
        </KeyboardAvoidingView>

        <Button title="Submit" style={styles.button} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(CreateListing);

export const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  sectionTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.blue,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  uploadContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    borderStyle: 'dotted',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 8,
  },
  uploadCircle: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPlus: {
    color: colors.white,
    fontSize: 28,
    marginTop: -4,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: 16,
  },
  imageCont: {
    flexDirection: 'row',
    marginTop: 8,
    marginRight: 8,
  },
  delete: {
    width: 24,
    height: 24,
    marginLeft: -16,
    marginTop: -10,
  },
  textarea: {
    minHeight: 150,
    paddingTop: 16,
  },
  button: {
    marginBottom: 160,
  },
});
