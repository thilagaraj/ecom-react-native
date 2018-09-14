package com.trolleyfresh.modules;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.paytm.pgsdk.PaytmOrder;
import com.paytm.pgsdk.PaytmPGService;
import com.paytm.pgsdk.PaytmPaymentTransactionCallback;
import com.trolleyfresh.BuildConfig;
import com.trolleyfresh.R;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

@ReactModule(name = "PayTM")
public class PayTmModule extends ReactContextBaseJavaModule {

    private final String TAG = getClass().getSimpleName();
    private final ReactApplicationContext context;

    public PayTmModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    /**
     * Usage in react - React.NativeModules.PayTM
     */
    @Override
    public String getName() {
        return "PayTM";
    }

    /**
     * returns the constant values that need to be exposed to JavaScript
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }

    @ReactMethod
    public void makePayment(String mobileNo, String email) {
        PaytmPGService pgService = BuildConfig.DEBUG ? PaytmPGService.getStagingService() : PaytmPGService.getProductionService();
        PaytmOrder paytmOrder = new PaytmOrder(getParams(mobileNo, email));

        pgService.initialize(paytmOrder, null);
        pgService.startPaymentTransaction(context, true, true, getPaymentTransactionCallback());
    }

    @NonNull
    private PaytmPaymentTransactionCallback getPaymentTransactionCallback() {
        return new PaytmPaymentTransactionCallback() {
            @Override
            public void onTransactionResponse(Bundle bundle) {
                Log.i(TAG, "onTransactionResponse()");
            }

            @Override
            public void networkNotAvailable() {
                Log.i(TAG, "networkNotAvailable()");
            }

            @Override
            public void clientAuthenticationFailed(String s) {
                Log.i(TAG, "clientAuthenticationFailed()");
            }

            @Override
            public void someUIErrorOccurred(String s) {
                Log.i(TAG, "someUIErrorOccurred()");
            }

            @Override
            public void onErrorLoadingWebPage(int i, String s, String s1) {
                Log.i(TAG, "onErrorLoadingWebPage()");
            }

            @Override
            public void onBackPressedCancelTransaction() {
                Log.i(TAG, "onBackPressedCancelTransaction()");
            }

            @Override
            public void onTransactionCancel(String s, Bundle bundle) {
                Log.i(TAG, "onTransactionCancel()");
            }
        };
    }

    private Map<String, String> getParams(String mobileNo, String email) {
        Map<String, String> params = new HashMap<>();
        int merchantKeyId = BuildConfig.DEBUG ? R.string.paytm_staging_merchant_key : R.string.paytm_production_merchant_key;
        params.put("MID", context.getResources().getString(merchantKeyId));
        params.put("ORDER_ID", "ORDER0000000001");
        params.put("CUST_ID", "10000988111");
        params.put("INDUSTRY_TYPE_ID", "Retail");
        params.put("CHANNEL_ID", "WAP");
        params.put("TXN_AMOUNT", "1");
        params.put("WEBSITE", "PAYTM_WEBSITE");
        params.put("CALLBACK_URL", "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=ORDER0000000001");
        params.put("EMAIL", email.trim());
        params.put("MOBILE_NO", mobileNo.trim());
        params.put("CHECKSUMHASH", "w2QDRMgp1/BNdEnJEAPCIOmNgQvsi+BhpqijfM9KvFfRiPmGSt3Ddzw+oTaGCLneJwxFFq5mqTMwJXdQE2EzK4px2xruDqKZjHupz9yXev4=");

        return params;
    }
}
