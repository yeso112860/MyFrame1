package tr.org.turksat.backend.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if ( authentication != null && !(authentication instanceof AnonymousAuthenticationToken))
            if(authentication.getPrincipal() instanceof DefaultOidcUser   ){
                return Optional.ofNullable( ((DefaultOidcUser) authentication.getPrincipal()).getClaim("preferred_username"));
            }else if(authentication instanceof UsernamePasswordAuthenticationToken ){
                return Optional.ofNullable( (String)  authentication.getPrincipal());
            } else {
                return Optional.ofNullable(((Jwt) authentication.getPrincipal()).getClaim("preferred_username"));
            }
        else
            return Optional.of("anonymousUser");
    }
}