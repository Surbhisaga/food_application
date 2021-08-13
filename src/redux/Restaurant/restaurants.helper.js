import  {firestore} from './../../firebase/utils';

export const handleAddRestaurant =async restaurant =>{
    return new Promise((resolve, reject)=>{
        firestore
        .collection('restaurants')
        .doc()
        .set(restaurant)
        .then(()=>{
            resolve();
        })
        .catch(err =>{
            reject(err);
        })
    });
}

export const handleFetchRestaurants = ()=>{
    return new Promise((resolve, reject)=>{
        firestore
        .collection('restaurants')
        .orderBy('createData')
        .get()
        .then(snapshot=>{
            const restaurantsArray = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    restaurantID:doc.id
                }
            });
            resolve(restaurantsArray);
        })
        .catch(err => {
            reject(err);
        });
    })
}

export const handleDeleteRestaurant = restaurantID =>{
    return new Promise((resolve,reject)=>{
        firestore
        .collection('restaurants')
        .doc(restaurantID)
        .delete()
        .then(()=>{
            resolve();
        })
        .catch(err=>{
            reject(err);
        })
    })
}