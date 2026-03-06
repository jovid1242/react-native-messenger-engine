#include <jni.h>
#include "messengerengineOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::messengerengine::initialize(vm);
}
