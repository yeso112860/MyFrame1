package tr.org.turksat.backend.config;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<Long> {
    //    public Optional<String> getCurrentAuditor() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken))
//            if (authentication.getPrincipal() instanceof DefaultOidcUser) {
//                return Optional.ofNullable(((DefaultOidcUser) authentication.getPrincipal()).getClaim("preferred_username"));
//            } else if (authentication instanceof UsernamePasswordAuthenticationToken) {
//                return Optional.ofNullable((String) authentication.getPrincipal());
//            } else {
//                return Optional.ofNullable(((Jwt) authentication.getPrincipal()).getClaim("preferred_username"));
//            }
//        else
//            return Optional.of("anonymousUser");
//    }
    public Optional<Long> getCurrentAuditor() {
        return Optional.of(1L);
    }
}