import { firestore } from "./../../firebase/utils";

export const handleAddMeal =async meal =>{
    return new Promise((resolve, reject)=>{
        firestore
        .collection('meals')
        .doc()
        .set(meal)
        .then(()=>{
            resolve();
        })
        .catch(err =>{
            reject(err);
        })
    });
}

export const handleFetchMeals = ({filterType})=>{
    return new Promise((resolve, reject)=>{
        let ref = firestore.collection('meals').orderBy('createData');

        if(filterType) ref = ref.where('restaurant','==',filterType);
        ref
        .get()
        .then(snapshot=>{
            const mealsArray = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    documentID:doc.id
                }
            });
            resolve(mealsArray);
        })
        .catch(err => {
            reject(err);
        });
    })
}

export const handleDeleteMeal = documentID =>{
    return new Promise((resolve,reject)=>{
        firestore
        .collection('meals')
        .doc(documentID)
        .delete()
        .then(()=>{
            resolve();
        })
        .catch(err=>{
            reject(err);
        })
    })
}