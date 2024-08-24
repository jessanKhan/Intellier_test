import { Q } from '@nozbe/watermelondb';
import moment from 'moment';

import database from '@/store/database';
import ToastPopUp from '@/utils/Toast.android';

export const addTransaction = async (payload: any): Promise<any> => {
  try {
    await database.write(async () => {
      // const netStatus = await fetch().then(state => state);
      // let netStatusIs: boolean;

      // if (
      //   netStatus.isConnected != null &&
      //   netStatus.isInternetReachable != null &&
      //   netStatus.isWifiEnabled != null
      // ) {
      //   netStatusIs =
      //     netStatus.isConnected && netStatus.isInternetReachable && netStatus.isWifiEnabled;
      // } else {
      //   netStatusIs = false;
      // }

      await database.get('transaction').create((transaction: any) => {
        transaction.orderEntity = payload[0].orderEntity.id;
        transaction.workProcess = payload[0].workProcess.id.toString();
        transaction.organization = payload[0].organization.id;
        transaction.style = parseInt(payload[0].style.id);
        transaction.qualityType = payload[0].qualityType.id;
        transaction.newQualityDefect = JSON.stringify(payload[0].newQualityDefect); // payload[0].newQualityDefect; // Adding newQualityDefect field
        transaction.sampleSize = payload[0].sampleSize;
        transaction.checkOutput = payload[0].checkOutput;
        transaction.productionTime = payload[0].productionTime;
        transaction.transactionId = payload[0].transactionId;
        transaction.deviceId = payload[0].deviceId;
        transaction.isRepaired = payload[0].isRepaired;
        if (payload[0].varience !== null && payload[0].varience !== undefined) {
          transaction.varience = payload[0].varience;
        }
      });

      const countCollection = database.get('count');
      const countRecord: any = await countCollection.query().fetch();

      const productionFireTime: string = moment().format('YYYY-MM-DDTHH:mm:ss');

      const index = countRecord.length - 1;

      await database.get('count').create((transaction: any) => {
        transaction.total = parseInt(countRecord[index].total) + 1;
        transaction.pass =
          payload[1].status === 'pass' ||
          payload[1].status === 'repairPass' ||
          payload[1].status === 'offlinePass'
            ? parseInt(countRecord[index].pass) + 1
            : countRecord[0].pass;
        transaction.alter =
          payload[1].status === 'alter' || payload[1].status === 'repairAlter'
            ? parseInt(countRecord[index].alter) + 1
            : countRecord[0].alter;
        transaction.reject =
          payload[1].status === 'reject' || payload[1].status === 'repairReject'
            ? parseInt(countRecord[index].reject) + 1
            : countRecord[0].reject;
        transaction.offlinePass = parseInt(countRecord[index].offlinePass) + 1;
        // !netStatusIs
        //   ? parseInt(countRecord[index].offlinePass) + 1
        //   : countRecord[0].offlinePass;
        transaction.productionFireTime = productionFireTime;

        transaction.repairPass =
          payload[1].status === 'repairPass'
            ? parseInt(countRecord[0].repairPass) + 1
            : countRecord[0].repairPass;
        transaction.repairAlter =
          payload[1].status === 'repairAlter'
            ? parseInt(countRecord[0].repairAlter) + 1
            : countRecord[0].repairAlter;
        transaction.repairReject =
          payload[1].status === 'repairReject'
            ? parseInt(countRecord[0].repairReject) + 1
            : countRecord[0].repairReject;
      });

      await countRecord[index].destroyPermanently();

      ToastPopUp(payload[1].message);
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    // Handle the error here if creation fails
  }
};

export const deleteAllTransaction = async (currentTime: any): Promise<void> => {
  try {
    const transactions = await database.collections
      .get('transaction')
      .query(Q.where('productionTime', Q.lt(currentTime)))
      .fetch();

    if (transactions.length !== 0) {
      await database.write(async () => {
        for (const transaction of transactions) {
          await transaction.destroyPermanently();
        }
      });
    }
  } catch (error) {
    console.error('Error deleting all transactions:', error);
    // Handle the error here if deletion fails
  }
};

// export const deleteAllTransaction = async (currentTime: any): Promise<void> => {
//   try {
//     const transactions = await database.collections
//       .get('transaction')
//       .query(Q.where('productionTime', Q.lt(currentTime)))
//       .fetch();

//     if (transactions.length === 0) {
//       return;
//     } else {
//       await database.write(async () => {
//         for (const transaction of transactions) {
//           await transaction.destroyPermanently();
//         }
//       });
//     }
//     // });
//   } catch (error) {
//     console.error('Error deleting all transactions:', error);
//     // Handle the error here if deletion fails
//   }
// };

// when auto submit submit data

export const updateOfflineCount = async (): Promise<any> => {
  try {
    await database.write(async () => {
      const countCollection = database.get('count');
      const countRecord: any = await countCollection.query().fetch();

      const index = countRecord.length - 1;

      // check transaction and update again

      const transaction = await database.get('transaction').query().fetch();

      if (transaction.length > 0) {
        await database.get('count').create((transaction: any) => {
          transaction.total = countRecord[0].total;
          transaction.pass = countRecord[0].pass;
          transaction.alter = countRecord[0].alter;
          transaction.reject = countRecord[0].reject;
          transaction.repairPass = countRecord[0].repairPass;
          transaction.repairAlter = countRecord[0].repairAlter;
          transaction.repairReject = countRecord[0].repairReject;
          transaction.offlinePass = 0;
          transaction.productionFireTime = countRecord[0].productionFireTime;
        });

        await countRecord[index].destroyPermanently();
      } else {
        await countRecord[index].update((count: any) => {
          count.offlinePass = transaction.length;
        });
      }
    });
  } catch (error) {
    console.error('Error updateOfflineCount:', error);
    // Handle the error here if deletion fails
  }
};

export const deleteLastTransaction = async (payload: any): Promise<any> => {
  try {
    await database.write(async () => {
      // const netStatus = await fetch().then(state => state);
      // let netStatusIs: boolean;
      // if (
      //   netStatus.isConnected != null &&
      //   netStatus.isInternetReachable != null &&
      //   netStatus.isWifiEnabled != null
      // ) {
      //   netStatusIs =
      //     netStatus.isConnected && netStatus.isInternetReachable && netStatus.isWifiEnabled;
      // } else {
      //   netStatusIs = false;
      // }

      const transactions = await database.get('transaction').query().fetch();
      const lastTransaction = transactions[transactions.length - 1];
      if (lastTransaction !== null) {
        await lastTransaction.destroyPermanently();

        const countCollection = database.get('count');
        const countRecord: any = await countCollection.query().fetch();

        const index = countRecord.length - 1;

        await database.get('count').create((transaction: any) => {
          transaction.total = countRecord[0].total - 1;
          transaction.pass =
            payload.payload === 'pass' || payload.payload === 'repairPass'
              ? countRecord[0].pass - 1
              : countRecord[0].pass;
          transaction.alter =
            payload.payload === 'alter' || payload.payload === 'repairAlter'
              ? countRecord[0].alter - 1
              : countRecord[0].alter;
          transaction.reject =
            payload.payload === 'reject' || payload.payload === 'repairReject'
              ? countRecord[0].reject - 1
              : countRecord[0].reject;
          transaction.repairPass =
            payload.payload === 'repairPass'
              ? countRecord[0].repairPass - 1
              : countRecord[0].repairPass;
          transaction.repairAlter =
            payload.payload === 'repairAlter'
              ? countRecord[0].repairAlter - 1
              : countRecord[0].repairAlter;
          transaction.repairReject =
            payload.payload === 'repairReject'
              ? countRecord[0].repairReject - 1
              : countRecord[0].repairReject;
          transaction.offlinePass =
            countRecord[0].offlinePass !== 0
              ? countRecord[0].offlinePass - 1
              : countRecord[0].offlinePass;
          transaction.productionFireTime = countRecord[0].productionFireTime;
        });

        await countRecord[index].destroyPermanently();

        ToastPopUp('Undo Successfully.');
      } else {
        // console.log('No transactions found to delete.');
      }
    });
  } catch (error) {
    console.error('Error deleting last transaction:', error);
    // Handle the error here if deletion fails
  }
};

export const resetCountTable = async (): Promise<any> => {
  try {
    await database.write(async () => {
      // Find the buyer with the specified ID
      const count: any = await database.get('count').query().fetch();

      if (count !== undefined && count !== null && count.length > 0) {
        // 3 days app clear everything

        if (count[0].productionFireTime !== '') {
          const productionFireTime = moment(count[0].productionFireTime).format('YYYY-MM-DD');

          const todayDate = moment().format('YYYY-MM-DD');
          if (!moment(todayDate).isSame(productionFireTime)) {
            const index = count.length - 1;

            await database.get('count').create((transaction: any) => {
              transaction.total = 0;
              transaction.pass = 0;

              transaction.alter = 0;
              transaction.reject = 0;
              transaction.offlinePass = 0;
              transaction.productionFireTime = todayDate;

              transaction.repairPass = 0;
              transaction.repairAlter = 0;
              transaction.repairReject = 0;
            });

            await count[index].destroyPermanently();
          }
        }
      }
    });
  } catch (err) {
    console.error('database delete failed.');
  }
};
