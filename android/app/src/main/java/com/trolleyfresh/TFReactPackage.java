package com.trolleyfresh;

import com.facebook.react.LazyReactPackage;
import com.facebook.react.bridge.ModuleSpec;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.trolleyfresh.modules.PayTmModule;

import java.util.Collections;
import java.util.List;

import javax.inject.Provider;

public class TFReactPackage extends LazyReactPackage {

    @Override
    public List<ModuleSpec> getNativeModules(final ReactApplicationContext context) {
        ModuleSpec payTmModuleSpec = new ModuleSpec(
                PayTmModule.class,
                new Provider<NativeModule>() {
                    @Override
                    public NativeModule get() {
                        return new PayTmModule(context);
                    }
                });
        return Collections.singletonList(payTmModuleSpec);
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return LazyReactPackage.getReactModuleInfoProviderViaReflection(this);
    }

}
